import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/agent/Sidebar";
import Navbar from "../../components/agent/Navbar";
import StatCard from "../../components/agent/StatCard";
import { FileText, CheckCircle, User } from "lucide-react"; 

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);  // Add sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/clients", {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data);
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (err) {
        setError("Impossible de récupérer les clients.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [searchTerm, clients]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} searchQuery={searchTerm} setSearchQuery={setSearchTerm} />

        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-semibold mb-4">Liste des Clients</h1>
          <section className="bg-white/70 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-sm p-6 mb-8">

          {/* Barre de recherche */}
          <input type="text" placeholder="Rechercher un client par nom"  className="p-2 mb-4 w-full border border-gray-300 rounded-md" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

         

          {/* Tableau des clients */}
          <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Nom</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client, index) => (
                    <tr key={client.id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                      <td className="px-4 py-3">{client.name}</td>
                      <td className="px-4 py-3">{client.email}</td>
                      <td className="px-4 py-3">
                        <a href={`/create-contract/${client.id}`} className="text-green-600 hover:underline ml-4">Créer un contrat</a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center text-gray-500">Aucun client trouvé.</td>
                  </tr>
                )}
              </tbody>
          </table>

          </section>
        </main>
      </div>
    </div>
  );
};

export default ClientsPage;
