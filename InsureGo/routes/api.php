<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\AgentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContratAssuranceController;
use App\Http\Controllers\SinistreController;
use App\Http\Controllers\DashboardAgentController;


// Authentification
Route::post('/token-login', [AuthController::class, 'login']);
Route::post('/token-register', [AuthController::class, 'register']);


Route::get('/test-csrf', function () {
    return response()->json(['message' => 'CSRF test']);
});


// Infos utilisateur connecté (authentifié) 
Route::middleware('auth:sanctum')->group(function(){
     Route::get('/user', [UserController::class, 'me']);
     Route::put('/user/profile', [UserController::class, 'update']);
     Route::put('/user/change-password', [UserController::class, 'changePassword']);
     Route::Post('/user/upload-photo',[UserController::class,'uploadPhoto']);
});


// Routes réservées à l’admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/admin/create-agent', [AgentController::class, 'store']);
    Route::put('/admin/change-role/{user}', [UserController::class, 'changeRole']);
    Route::put('/sinistres/{id}', [SinistreController::class, 'update']);
    Route::delete('/sinistres/{id}', [SinistreController::class, 'destroy']);
});
 

//Contrats d'assurance 
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contrats/{id}', [ContratAssuranceController::class, 'show']);
    Route::put('/contrats/{id}', [ContratAssuranceController::class, 'update']);
    Route::delete('/contrats/{id}', [ContratAssuranceController::class, 'destroy']);
    Route::get('/mes-contrats', [ContratAssuranceController::class, 'mesContrats']);

});
 
Route::put('/sinistres/{id}/associer-contrat', [SinistreController::class, 'associerContrat']);

// Sinistres
// Route::post('/sinistres', [SinistreController::class, 'store']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/sinistres', [SinistreController::class, 'store']);
    Route::get('/sinistres', [SinistreController::class, 'index']);
    Route::get('/sinistres/{id}', [SinistreController::class, 'getSinistre']);
    Route::get('/sinistres-agent', [SinistreController::class, 'getSinistresByAgent']);
    Route::put('/sinistres/{id}/statut', [SinistreController::class, 'updateStatut']);
    // Route::put('/sinistres/{id}', [SinistreController::class, 'update']);
    
});

// Routes réservées à l’agent
Route::middleware(['auth:sanctum', 'role:agent'])->group(function () {
    Route::post('/contrats', [ContratAssuranceController::class, 'store']);
    Route::get('/contrats', [ContratAssuranceController::class, 'index']);

});
Route::middleware(['auth:sanctum'])->get('/dashboard-agent', [DashboardAgentController::class, 'index']);


Route::middleware('auth:sanctum')->get('/clients', [UserController::class, 'getClients']);
Route::middleware('auth:sanctum')->get('/all-clients', [UserController::class, 'getAllClients']);





