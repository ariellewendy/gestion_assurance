<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request; // Manquait !
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }




    public function boot()
    {
        Fortify::requestPasswordResetLinkView(function () {
            return response()->json(['message' => 'Lien de réinitialisation envoyé']);
        });
    
        Fortify::resetPasswordView(function () {
            return response()->json(['message' => 'Réinitialisation possible']);
        });
    
        Fortify::resetUserPasswordsUsing(function ($user, array $input) {
            Validator::make($input, [
                'email' => ['required', 'email'],
                'password' => [
                    'required',
                    'string',
                    'confirmed',
                    'regex:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/',
                ],
            ])->validate();
    
            $user->forceFill([
                'password' => Hash::make($input['password']),
            ])->save();
        });
    }




    // public function boot(): void
    // {
    //     // Vue personnalisée pour la page de connexion
    //     Fortify::loginView(fn () => view('auth.login'));

    //     // Définir manuellement la logique d'authentification (login)
    //     Fortify::authenticateUsing(function (Request $request) {
    //         $user = User::where('email', $request->email)->first();

    //         if ($user && Hash::check($request->password, $user->password)) {
    //             return $user;
    //         }

    //         return null; // Important de retourner null si l'auth échoue
    //     });

    //     // Définir comment créer un utilisateur à l'inscription (register)
    //     Fortify::createUsersUsing(function (array $input) {
    //         // Validation
    //         Validator::make($input, [
    //             'name' => ['required', 'string', 'max:255'],
    //             'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
    //             'password' => [
    //                 'required',
    //                 'string',
    //                 'min:8',             // Minimum 8 caractères
    //                 'regex:/[A-Z]/',     // Au moins une majuscule
    //                 'regex:/[0-9]/',     // Au moins un chiffre
    //                 'confirmed',         // Vérifie que password == password_confirmation
    //             ],
    //         ])->validate();

    //         // Création de l'utilisateur
    //         return User::create([
    //             'name' => $input['name'],
    //             'email' => $input['email'],
    //             'password' => Hash::make($input['password']),
    //         ]);
    //     });
    // }
}


