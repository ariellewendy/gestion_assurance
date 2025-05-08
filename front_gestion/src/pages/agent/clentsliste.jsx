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
  const [sidebarOpen, setSidebarOpen] = useState(true);  
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
      }
      //  finally {
      //   setLoading(false);
      // }
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

  // if (loading) return <div>Chargement...</div>;
  // if (error) return <div>{error}</div>;

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
          <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 bg-blue-50/50 border-b border-blue-100/50">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold">NOM</th>
                  <th scope="col" className="px-6 py-3 font-semibold">EMAIL</th>
                  <th scope="col" className="px-6 py-3 font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client, index) => (
                    <tr 
                      key={client.id} 
                      className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'} 
                        hover:bg-blue-100/20 
                        transition-colors 
                        duration-200
                        border-b border-blue-100/30
                      `}
                    >
                      <td className="px-6 py-4">{client.name}</td>
                      <td className="px-6 py-4">{client.email}</td>
                      <td className="px-6 py-4">
                        <a 
                          href={`/create-contract/${client.id}`} 
                          className={`
                            text-green-600 
                            hover:text-green-900 
                            transition-colors 
                            duration-200 
                            rounded-full 
                            p-1 
                            hover:bg-green-100
                          `}
                        >
                          Créer un contrat
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500 bg-blue-50/30">Aucun client trouvé.</td>
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
