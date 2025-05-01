<?php

namespace App\Http\Controllers;
use App\Models\ContratAssurance;

use Illuminate\Http\Request;

class DashboardAgentController extends Controller
{

        public function index(Request $request)
        {
            // Statistiques
            $totalPolices = ContratAssurance::count();
            $totalSinistres = ContratAssurance::where('status', 'sinistre')->count();
            $nombreClients = ContratAssurance::distinct('client_id')->count();
    
            return response()->json([
                'totalPolices' => $totalPolices,
                'totalSinistres' => $totalSinistres,
                'nombreClients' => $nombreClients
            ]);
        }
    
    
     
}
    
    
    

