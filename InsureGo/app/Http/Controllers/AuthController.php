<?php

namespace App\Http\Controllers; 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        
        // Validation des champs du formulaire
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Recherche de l'utilisateur par email
        $user = User::where('email', $request->email)->first();

        // Vérification de l'existence de l'utilisateur et du mot de passe
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont invalides.'],
            ]);
        }

        if (!in_array($user->role, ['client', 'agent', 'admin'])) {
            return response()->json(['message' => 'Vous n’êtes pas autorisé à vous connecter.'], 403);
        }
        
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }


    public function register(Request $request)
    {
        // Validation des champs du formulaire d'inscription
        $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => [
                'required',
                'string',
                'regex:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/', 
            ],
        ]);



        
            // Trouver l’agent avec le moins de clients
            $agent = User::where('role', 'agent')
            ->withCount('clients')
            ->orderBy('clients_count', 'asc')
            ->first();

        $user = User::create([
            'name' => $request->name,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'client',
            'agent_id' => $agent ? $agent->id : null,  
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie.',
            'token' => $token,
            'user' => $user,
        ]);
        \Log::info('Register request', $request->all());

    }
    
}
