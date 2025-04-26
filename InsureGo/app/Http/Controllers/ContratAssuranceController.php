<?php
namespace App\Http\Controllers;

use App\Models\ContratAssurance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ContratAssuranceController extends Controller
{
    public function index()
    {
        $contrats = ContratAssurance::where('user_id', Auth::id())->get();
        return response()->json(['data' => $contrats], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type_assurance' => 'required|string',
            'date_effet' => 'required|date',
            'date_expiration' => 'required|date',
            'description' => 'nullable|string',
            'prime' => 'required|numeric',
            'status' => 'nullable|string',
            'details' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Génération du numéro de police automatique
        $numero_police = $this->genererNumeroPolice($request->type_assurance);

        // Création du contrat
        $contrat = ContratAssurance::create([
            'user_id' => Auth::id(),
            'numero_police' => $numero_police,
            'type_assurance' => strtolower($request->type_assurance),
            'date_effet' => $request->date_effet,
            'date_expiration' => $request->date_expiration,
            'description' => $request->description,
            'prime' => $request->prime,
            'status' => $request->status ?? 'actif',
            'details' => $request->details,
        ]);

        return response()->json(['message' => 'Contrat créé avec succès', 'data' => $contrat], 201);
    }

    private function genererNumeroPolice($type_assurance)
    {
        $prefixes = [
            'auto' => 'AUTO',
            'habitation' => 'HAB',
            'sante' => 'SAN',
            'voyage' => 'VOY',
        ];
    
        $prefix = $prefixes[strtolower($type_assurance)] ?? strtoupper(substr($type_assurance, 0, 3));
        $annee = now()->format('Y');
    
        $dernierContrat = ContratAssurance::where('type_assurance', strtolower($type_assurance))
            ->whereYear('created_at', $annee)
            ->orderByDesc('id')
            ->first();
    
        $numero = 1; // Valeur par défaut
        if ($dernierContrat && $dernierContrat->numero_police) {
            $parts = explode('-', $dernierContrat->numero_police);
            // Vérifier que le tableau a au moins trois éléments
            if (count($parts) >= 3) {
                $numero = (int) $parts[2] + 1;
            }
        }
    
        $numero_formate = str_pad($numero, 3, '0', STR_PAD_LEFT);
    
        return "{$prefix}-{$annee}-{$numero_formate}";
    }
    

    public function show($id)
    {
        $contrat = ContratAssurance::findOrFail($id);
        return response()->json(['data' => $contrat], 200);
    }

    public function update(Request $request, $id)
    {
        $contrat = ContratAssurance::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'type_assurance' => 'string',
            'date_effet' => 'date',
            'date_expiration' => 'date',
            'description' => 'nullable|string',
            'prime' => 'numeric',
            'status' => 'string',
            'details' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $contrat->update($request->all());

        return response()->json(['message' => 'Contrat mis à jour avec succès', 'data' => $contrat], 200);
    }

    public function destroy($id)
    {
        $contrat = ContratAssurance::findOrFail($id);
        $contrat->delete();

        return response()->json(['message' => 'Contrat supprimé avec succès'], 200);
    }


  
public function mesContrats(Request $request)
{
    $user = $request->user(); // récupère l'utilisateur connecté
    $contrats = Contrat::where('client_id', $user->id)->get();

    return response()->json($contrats);
}
}
