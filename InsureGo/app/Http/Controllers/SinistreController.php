<?php
namespace App\Http\Controllers;

use App\Models\Sinistre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SinistreController extends Controller
{
    public function store(Request $request)
    {
        return response()->json($request);
        // $request->validate([
        //     'police' => 'required|string',
        //     'typeIncident' => 'required|string',
        //     'dateSinistre' => 'required|date',
        //     'lieuSinistre' => 'required|string',
        //     'description' => 'required|string',
        //     'montantEstime' => 'required|numeric',
        //     'documents.*' => 'nullable|file|max:2048',
        //     'confirmation' => 'required|boolean',
        // ]);

        $files = [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $path = $file->store('sinistres/documents', 'public');
                $files[] = $path;
            }
        }
        return response()->json($files);
        

        $sinistre = Sinistre::create([
            'user_id' => Auth::id(),
            'police' => $request->police,
            'type_incident' => $request->typeIncident,
            'date_sinistre' => $request->dateSinistre,
            'lieu_sinistre' => $request->lieuSinistre,
            'description' => $request->description,
            'montant_estime' => $request->montantEstime,
            'documents' => $files,
            'confirmation' => $request->confirmation,
        ]);

        return response()->json(['message' => 'Sinistre déclaré avec succès', 'sinistre' => $sinistre], 201);
    }
}
