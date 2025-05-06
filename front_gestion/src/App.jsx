// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Inscription';
import Connexion from './pages/connexion';
import Navbar from "./components/Navbar";
import Dashboard from './pages/Dashboard';
import DeclarerSinistre from './pages/DeclarerSinistre';
import MesPolicesAssurance from './pages/MesPolicesAssurance';
import DetailsPoliceAssurance from './pages/DetailsPoliceAssurance';
import ProfilePage from './pages/ProfilePage';
import ContratForm from './pages/agent/ContractForm';
import DashboardAgent from './pages/agent/Dashboard_agent';
import CreateAgentForm from './pages/admin/CreateAgentForm';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import ClientsPage from './pages/agent/clentsliste';
import DetailsSinistre from './pages/agent/DetailsSinistre'; 
import SinistresAgent from './pages/agent/SinistresAgent';
const App = () => {
  return (
<>
<Navbar /> 
<Routes>
<Route path="/" element={<Home />} />
<Route path="/Connexion" element={<Connexion />} />
<Route path="/clientliste" element={<ClientsPage/>} />
<Route path="/Dashboard" element={<Dashboard />} />
<Route path="/DeclarerSinistre" element={<DeclarerSinistre />} />
<Route path="/MesPolicesAssurance" element={<MesPolicesAssurance />} />
<Route path="/DetailsPoliceAssurance/:id" element={<DetailsPoliceAssurance />} />
<Route path="/ProfilePage" element={<ProfilePage />} />
<Route path="/agent/dashboard" element={<DashboardAgent />} />
<Route path="/CreateAgentForm" element={<CreateAgentForm/>} />
<Route path="/create-contract/:clientId" element={<ContratForm />} />

<Route path="/admin/dashboard" element={<DashboardAdmin/>} />
<Route path="/sinistres-agent" element={<SinistresAgent />} />
<Route path="/details-sinistre/:id" element={<DetailsSinistre />} />
 
</Routes>
</>
);
}

export default App;

