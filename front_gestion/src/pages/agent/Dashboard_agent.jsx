import React, { useState, useEffect } from "react";
import api from "../../api";
import axios from 'axios';
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
        const [userRes, statsRes, policesRes] = await Promise.all([
         await axios.get("/api/user", { withCredentials: true, headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }}),
         await axios.get("/api/dashboard-agent", { withCredentials: true, headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        } }),
         await axiox.get("/api/mes-polices", { withCredentials: true, headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        } }),

        ]);
        setUser(userRes.data);
        setStats(statsRes.data);
        setPolices(policesRes.data);
        setFilteredPolices(policesRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = polices.filter((police) =>
      police.numero_police.toLowerCase().includes(searchQuery.toLowerCase()) ||
      police.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPolices(filtered);
  }, [searchQuery, polices]);

  const handleLogout = () => {
    api.post("/logout", {}, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err) => console.error("Erreur de déconnexion", err));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} user={user} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
                      <td className="px-4 py-3">{police.type}</td>
                      <td className="px-4 py-3">{police.numero_police}</td>
                      <td className="px-4 py-3">{police.date_effet}</td>
                      <td className="px-4 py-3">{police.date_expiration}</td>
                      <td className="px-4 py-3">
                        <a href={`/police/${police.id}`} className="text-blue-600 hover:underline">Voir</a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-gray-500">Aucune police disponible.</td>
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
