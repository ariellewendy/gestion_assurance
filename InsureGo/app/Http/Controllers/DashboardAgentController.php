<?php

namespace App\Http\Controllers;
use App\Models\ContratAssurance;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class DashboardAgentController extends Controller
{

    public function index(Request $request)
    {
        $agentId = Auth::id(); 
        $totalPolices = ContratAssurance::where('user_id', $agentId)->count();

        $totalSinistres = ContratAssurance::where('user_id', $agentId)
                                          ->where('status', 'sinistre')
                                          ->count();
        $nombreClients = ContratAssurance::where('user_id', $agentId)
        ->whereNotNull('client_id')
        ->distinct('client_id')
        ->count('client_id');

        $clients = ContratAssurance::where('user_id', $agentId)->pluck('client_id')->filter()->unique();
        Log::debug('Client IDs pour agent '.$agentId, $clients->toArray());

        
        
        Log::debug('Stats pour l\'agent ID ' . $agentId, [
            'totalPolices' => $totalPolices,
            'totalSinistres' => $totalSinistres,
            'nombreClients' => $nombreClients,
        ]);

        return response()->json([
            'totalPolices' => $totalPolices,
            'totalSinistres' => $totalSinistres,
            'nombreClients' => $nombreClients,
        ]);
    }
}


