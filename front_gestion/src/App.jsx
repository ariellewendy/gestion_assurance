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








 


const App = () => {
  return (
<>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/Connexion" element={<Connexion />} />
<Route path="/Dashboard" element={<Dashboard />} />
<Route path="/DeclarerSinistre" element={<DeclarerSinistre />} />
<Route path="/MesPolicesAssurance" element={<MesPolicesAssurance />} />
<Route path="/DetailsPoliceAssurance" element={<DetailsPoliceAssurance />} />
<Route path="/ProfilePage" element={<ProfilePage />} />
<Route path="/contrat/create" element={<ContratForm />} />
<Route path="/Dashboard_agent" element={<DashboardAgent />} />
<Route path="/CreateAgentForm" element={<CreateAgentForm/>} />
<Route path="/DashboardAdmin" element={<DashboardAdmin/>} />









</Routes>
</>
);
}

export default App;

