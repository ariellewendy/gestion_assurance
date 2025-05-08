import React, { useState, useEffect } from "react";
import { Home, BarChart2, UserPlus, Settings, User, Users, FileText, CheckCircle, Menu, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white/70 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-sm overflow-hidden">
    <div className="flex items-center p-5">
      <div className={`h-12 w-12 bg-${bgColor} rounded-lg flex items-center justify-center text-blue-600`}>
        {icon}
      </div>
      <div className="ml-4">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
      </div>
    </div>
  </div>
);

export default function ClientsAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [stats, setStats] = useState({
    nombreClients: 0,
    totalPolices: 0,
    totalSinistres: 0
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("api/logout", {}, { withCredentials: true })
      .then(() => navigate("/Connexion"))
      .catch((err) => console.error("Erreur de déconnexion", err));
  };

  useEffect(() => {
    // Remplacer par tes endpoints réels
    axios.get("http://localhost:8000/api/clients")
      .then(res => {
        setClients(res.data);
        setFilteredClients(res.data);
        setStats({
          nombreClients: res.data.length,
          totalPolices: res.data.reduce((sum, client) => sum + (client.nb_polices || 0), 0),
          totalSinistres: res.data.reduce((sum, client) => sum + (client.nb_sinistres || 0), 0)
        });
      })
      .catch(() => {
        setClients([]);
        setFilteredClients([]);
        setStats({ nombreClients: 0, totalPolices: 0, totalSinistres: 0 });
      });
  }, []);

  useEffect(() => {
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
      {/* Sidebar */}
      <aside className="bg-white/70 backdrop-blur-md border-r border-gray-200/50 shadow-lg flex flex-col w-64 transition-all duration-300 ease-in-out">
        <div className="p-4 flex items-center justify-between border-b border-gray-200/50">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="ml-2 font-semibold text-gray-800">InsureGo</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        </div>
        <nav className="p-4 flex-1">
          <div className="space-y-2">
            <a href="/admin/dashboard" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Home size={20} /> <span className="ml-3">Tableau de bord</span>
            </a>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <BarChart2 size={20} /> <span className="ml-3">Statistiques</span>
            </a>
            <a href="/CreateAgentForm" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <UserPlus size={20} /> <span className="ml-3">Ajouter un agent</span>
            </a>
            <a href="/admin/clients" className="flex items-center p-2 rounded-lg bg-blue-100 text-blue-600 font-semibold">
              <Users size={20} /> <span className="ml-3">Clients</span>
            </a>
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Settings size={20} /> <span className="ml-3">Paramètres</span>
            </a>
          </div>
        </nav>
        <a href="/ProfilePage" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <User size={20} /> <span className="ml-3">Mon Profil</span>
        </a>
        <div className="p-4 border-t border-gray-200/50">
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={20} /> <span className="ml-3">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="mr-4 text-gray-500" aria-label="Open sidebar"><Menu size={20} /></button>
              )}
              <h1 className="text-xl font-semibold text-gray-800">Gestion des Clients</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center bg-gray-100/80 rounded-full px-3 py-1.5">
                  <Search size={16} className="text-gray-500" />
                  <input type="text" placeholder="Rechercher..." className="bg-transparent border-none outline-none ml-2 text-sm w-40" aria-label="Search" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">A</div>
              </div>
            </div>
          </div>
        </header>
        {/* Statistiques */}
        <main className="flex-1 overflow-auto p-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Nombre de clients" value={stats.nombreClients} icon={<Users size={24} />} bgColor="blue-100" />
            <StatCard title="Total polices actives" value={stats.totalPolices} icon={<FileText size={24} />} bgColor="green-100" />
            <StatCard title="Total sinistres" value={stats.totalSinistres} icon={<CheckCircle size={24} />} bgColor="orange-100" />
          </section>

          {/* Tableau Clients */}
          <section className="bg-white/70 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Liste des Clients</h2>
            <input
              type="text"
              placeholder="Rechercher un client..."
              className="p-2 mb-4 w-full border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 bg-blue-50/50">
                  <tr className="border-b border-blue-100/50">
                    <th scope="col" className="px-6 py-3 font-semibold">NOM</th>
                    <th scope="col" className="px-6 py-3 font-semibold">EMAIL</th>
                    <th scope="col" className="px-6 py-3 font-semibold">TÉLÉPHONE</th>
                    <th scope="col" className="px-6 py-3 font-semibold">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length > 0 ? filteredClients.map((client, index) => (
                    <tr 
                      key={index} 
                      className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'} 
                        hover:bg-blue-100/20 
                        transition-colors 
                        duration-200
                        border-b border-blue-100/30
                      `}
                    >
                      <td className="px-6 py-4">{client.name} {client.prenom}</td>
                      <td className="px-6 py-4">{client.email}</td>
                      <td className="px-6 py-4">{client.telephone}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <Link 
                          to={`/details-client/${client.id}`} 
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200 rounded-full p-1 hover:bg-blue-100"
                        >
                          Détails
                        </Link>
                        <Link 
                          to={`/edit-client/${client.id}`} 
                          className="text-green-600 hover:text-green-900 transition-colors duration-200 rounded-full p-1 hover:bg-green-100"
                        >
                          Modifier
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="text-center py-8 text-gray-400">Aucun client trouvé.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}