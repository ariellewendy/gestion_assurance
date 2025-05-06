<?php

namespace App\Http\Controllers;

use App\Models\Sinistre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ContratAssurance;

class SinistreController extends Controller
{
    public function index()
    {
        $agent = Auth::user();
        $sinistres = Sinistre::whereIn('contrat_assurance_id', $agent->contacts()->pluck('id'))->get();
        return response()->json($sinistres);
    }

    public function getSinistresByAgent()
    {
        $agent = Auth::user();
        $sinistres = [];

        foreach ($agent->clients as $client) {
            $clientSinistres = $client->sinistres;
            if ($clientSinistres instanceof \Illuminate\Support\Collection) {
                $sinistres = array_merge($sinistres, $clientSinistres->toArray());
            }
        }

        return response()->json($sinistres ?: ['message' => 'Aucun sinistre trouvé.']);
    }

    public function getSinistre($id)
    {
        $sinistre = Sinistre::find($id);
        return $sinistre ? response()->json($sinistre) : response()->json(['message' => 'Non trouvé'], 404);
    }

    public function updateStatut(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|string|max:255',
        ]);

        $sinistre = Sinistre::find($id);
        if (!$sinistre) return response()->json(['message' => 'Sinistre non trouvé'], 404);

        $sinistre->statut = $request->statut;
        $sinistre->save();

        return response()->json(['message' => 'Statut mis à jour', 'sinistre' => $sinistre]);
    }

    public function associerContrat(Request $request, $id)
    {
        $request->validate([
            'contrat_id' => 'required|exists:contract_assurance,id',
        ]);

        $sinistre = Sinistre::find($id);
        $contrat = ContratAssurance::find($request->contrat_id);

        if (!$sinistre || !$contrat) {
            return response()->json(['message' => 'Données invalides'], 404);
        }

        $sinistre->contrat()->associate($contrat);
        $sinistre->save();

        return response()->json(['message' => 'Sinistre associé au contrat']);
    }



    // public function associerContrat(Request $request, $sinistreId)
    // {
    //     $request->validate([
    //         'contrat_id' => 'required|exists:contrats,id',
    //     ]);
    
    //     $sinistre = Sinistre::findOrFail($sinistreId);
    //     $sinistre->contrat_id = $request->contrat_id;
    //     $sinistre->save();
    
    //     return response()->json([
    //         'message' => 'Contrat associé avec succès au sinistre.',
    //         'sinistre' => $sinistre
    //     ], 200);
    // }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'police' => 'required|string',
            'type_incident' => 'required|string',
            'date_sinistre' => 'required|date',
            'lieu_sinistre' => 'required|string',
            'description' => 'required|string',
            'montant_estime' => 'required|numeric',
            'documents.*' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
            'contrat_assurance_id' => 'nullable|exists:contract_assurance,id',
        ]);

        $paths = [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $paths[] = $file->store('sinistres/documents', 'public');
            }
        }

        $sinistre = Sinistre::create([
            'user_id' => Auth::id(),
            'police' => $validated['police'],
            'type_incident' => $validated['type_incident'],
            'date_sinistre' => $validated['date_sinistre'],
            'lieu_sinistre' => $validated['lieu_sinistre'],
            'description' => $validated['description'],
            'montant_estime' => $validated['montant_estime'],
            'documents' => $paths,
            'confirmation' => false,
            'contrat_assurance_id' => $validated['contrat_assurance_id'] ?? null,
        ]);

        return response()->json(['message' => 'Sinistre enregistré', 'sinistre' => $sinistre], 201);
    }

    public function showContrat($id)
    {
        $contrat = ContratAssurance::find($id);
        $sinistres = $contrat ? $contrat->sinistres : [];
        return view('contrat.show', compact('contrat', 'sinistres'));
    }
}
