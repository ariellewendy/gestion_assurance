import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/agent/Sidebar";
import Navbar from "../../components/agent/Navbar";
import StatCard from "../../components/agent/StatCard";
import { FileText, CheckCircle, User } from "lucide-react";

const DashboardAgent = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ totalPolices: 0, totalSinistres: 0, nombreClients: 0 });
  const [polices, setPolices] = useState([]);
  const [filteredPolices, setFilteredPolices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const token = localStorage.getItem('token');
        const headers = {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${token}` }
        };

        const [userRes, statsRes, policesRes] = await Promise.all([
          axios.get("/api/user", headers),
          axios.get("/api/dashboard-agent", headers),
          axios.get("/api/contrats", headers),
        ]);
        
        console.log(statsRes.data); 
        
        setUser(userRes.data);
        setStats(statsRes.data);   
        setPolices(policesRes.data.contrats); 
        setFilteredPolices(policesRes.data.contrats);

      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = polices.filter((police) =>
      police.numero_police.toLowerCase().includes(searchQuery.toLowerCase()) ||
      police.type_assurance.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPolices(filtered);
  }, [searchQuery, polices]);

  const handleLogout = () => {
    axios.post("api/logout", {}, { withCredentials: true })
      .then(() => navigate("/Connexion"))
      .catch((err) => console.error("Erreur de déconnexion", err));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <main className="flex-1 overflow-auto p-6">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Nombre de clients" value={stats.nombreClients} icon={<User size={24} />} bgColor="blue-100" />
            <StatCard title="Total polices actives" value={stats.totalPolices} icon={<FileText size={24} />} bgColor="green-100" />
            <StatCard title="Total sinistres" value={stats.totalSinistres} icon={<CheckCircle size={24} />} bgColor="orange-100" />
          </section>

          <section className="bg-white/70 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-sm p-6 mb-8">
            <input
              type="text"
              placeholder="Rechercher une police..."
              className="p-2 mb-4 w-full border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">TYPE</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">NUMÉRO DE POLICE</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">DATE D'EFFET</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">DATE D'EXPIRATION</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolices.length > 0 ? (
                  filteredPolices.map((police, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                      <td className="px-4 py-3">{police.type_assurance}</td>
                      <td className="px-4 py-3">{police.numero_police}</td>
                      <td className="px-4 py-3">{new Date(police.date_effet).toLocaleDateString("fr-FR")}</td>
                      <td className="px-4 py-3">{new Date(police.date_expiration).toLocaleDateString("fr-FR")}</td>
                      <td className="px-4 py-3">
                      <Link to={`/DetailsPoliceAssurance/${police.id}`} className="text-blue-600 hover:underline">Voir</Link>
                        {/* <a href={`/DetailsPoliceAssurance/${police.id}`} className="text-blue-600 hover:underline">Voir</a> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-gray-500">Aucune police trouvée.</td>
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

export default DashboardAgent;
