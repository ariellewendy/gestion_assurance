<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  Illuminate\Support\Facades\Validator;

class UserController extends Controller{
    public function me(Request $request){
        return response()->json($request->user());
    }

    public function update(Request $request){
        $user=$request->user();

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],

            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
        ]);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }
        $user->update([
            'name'=>$request->name,
            'prenom'=>$request->prenom,

            'email'=>$request->email,
        ]);

        return response()->json([
            'message'=>'profil mis a jour avec succes.',
            'user'=>$user,
        ]);
    }

    public function changeRole(Request $request, $id){
        $user=\App\Models\User::finfdOrfail($id);

        $validated=$request->Validate([
            'role'=>'required|in:client,agent,admin',
        ]);

         $user->role= $validated['role'];
         $user->save();

         return response()->json([
            'message'=>'role mis a joour avec succes',
            'user'=>$user,
         ]);
    }


    public function changePassword(Request $request){
        $request->validate([
            'current_password'=>'required',
            'new_password'=>[
                'required',
                'string',
                'regex:/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/', // Min. 8 caractères, au moins une majuscule et un chiffre
            ],
        ]);

        $user=$request->user();
        if(!Hash::check($request->current_password, $user->password)){
            response()->json(['message'=>'mot de passe actuel incorrect',403]);
        }

            $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json(['message' => 'Mot de passe mis à jour avec succès']);

    }

    public function uploadPhoto(Request $request){
        $request->validate([
            'photo'=>'requied|image|max:2048', //max:2MB
        ]);

        $user=$request->user();
        $path=$request->file('photo')->store('profile-photo','public');

        $user->profile_photo_path= $path;
        $user->save();

        return response()->json([
          'message'=>'photo de profile mise a jour',
          'photo_url'=>asset('storage/'. $path),
        ]);
    }
}
