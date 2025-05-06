<?php
namespace App\Http\Controllers;
use App\Models\User;

use App\Models\ContratAssurance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ContratAssuranceController extends Controller
{

    public function index()
{
    $user = auth()->user();

    $query = ContratAssurance::with(['client', 'agent']); 
 
    if ($user->role === 'admin') {
        $contrats = $query->get();
    } elseif ($user->role === 'agent') {
        $contrats = $query->where('user_id', $user->id)->get();
    } elseif ($user->role === 'client') {
        $contrats = $query->where('client_id', $user->id)->get();
    } else {
        return response()->json(['message' => 'Rôle utilisateur non reconnu'], 403);
    }

    return response()->json(['contrats' => $contrats], 200);
}

 

   


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type_assurance' => 'required|string',
            'date_effet' => 'required|date',
            'date_expiration' => 'required|date|after_or_equal:date_effet',
            'description' => 'nullable|string',
            'prime' => 'required|numeric',
            'client_id' => 'required|exists:users,id',
            'status' => 'nullable|string',
            'details' => 'nullable|array',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $validatedData = $validator->validated();
    
        $client = User::find($validatedData['client_id']);
        if ($client->role !== 'client') {
            return response()->json(['message' => 'Cet utilisateur n\'est pas un client valide.'], 400);
        }
    
        $numero_police = $this->genererNumeroPolice($validatedData['type_assurance']);
    
        $contrat = ContratAssurance::create([
            'client_id' => $validatedData['client_id'],
            'user_id' => auth()->id(),
            'numero_police' => $numero_police,
            'type_assurance' => strtolower($validatedData['type_assurance']),
            'date_effet' => $validatedData['date_effet'],
            'date_expiration' => $validatedData['date_expiration'],
            'description' => $validatedData['description'] ?? null,
            'prime' => $validatedData['prime'],
            'status' => $validatedData['status'] ?? 'actif',
            'details' => $validatedData['details'] ?? null,
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
    
        $numero = 1; 
        if ($dernierContrat && $dernierContrat->numero_police) {
            $parts = explode('-', $dernierContrat->numero_police);
            if (count($parts) >= 3) {
                $numero = (int) $parts[2] + 1;
            }
        }
    
        $numero_formate = str_pad($numero, 3, '0', STR_PAD_LEFT);
    
        return "{$prefix}-{$annee}-{$numero_formate}";
    }
    

    public function show($id)
    {
        $user = auth()->user();
    
        $query = ContratAssurance::with(['client', 'agent', 'sinistres']);
    
        if ($user->role === 'admin') {
            // admin peut accéder à tous les contrats
            $contrat = $query->findOrFail($id);
        } elseif ($user->role === 'agent') {
            // agent ne voit que les contrats qu'il a créés
            $contrat = $query->where('id', $id)->where('user_id', $user->id)->first();
        } elseif ($user->role === 'client') {
            // client ne voit que ses propres contrats
            $contrat = $query->where('id', $id)->where('client_id', $user->id)->first();
        } else {
            return response()->json(['message' => 'Rôle non autorisé'], 403);
        }
    
        if (!$contrat) {
            return response()->json(['message' => 'Contrat non trouvé'], 404);
        }
    
        return response()->json(['data' => $contrat], 200);
    }
    
    

    

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Update the specified insurance contract in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     *
     * Validates the request data and updates the corresponding insurance contract
     * with the provided attributes. If validation fails, returns a 422 error response
     * with the validation errors. Otherwise, updates the contract and returns a
     * success message with the updated contract data.
     */

/*******  f77d735d-2a12-42c5-85f5-b5dd04d136b1  *******/
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
    $user = $request->user();
    $contrats = ContratAssurance::where('client_id', $user->id)->get();

    return response()->json($contrats);
}
}


