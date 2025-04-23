<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AgentController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'prenom'=>'required|string|max:255',
            'email'=>'required|string|email|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
            ],
            
        ]);

        $agent=User::create([
            'name'=>$request->name,
            'prenom'=>$request->prenom,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>'agent',
        ]);
        return response()->json(['message'=>'agent cree avec succes.','agent'=>$agent]);
    }
}
