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
            'numero_police' => 'required|string|unique:contrats_assurance',
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

        $contrat = ContratAssurance::create([
            'user_id' => Auth::id(),
            'numero_police' => $request->numero_police,
            'type_assurance' => $request->type_assurance,
            'date_effet' => $request->date_effet,
            'date_expiration' => $request->date_expiration,
            'description' => $request->description,
            'prime' => $request->prime,
            'status' => $request->status ?? 'actif',
            'details' => $request->details,
        ]);

        return response()->json(['message' => 'Contrat créé avec succès', 'data' => $contrat], 201);
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
}
