import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/agent/Sidebar';
import Navbar from '../../components/agent/Navbar';

const SinistresAgent = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [sinistres, setSinistres] = useState([]);
  const [filteredSinistres, setFilteredSinistres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const token = localStorage.getItem('token');
        const headers = {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${token}` }
        };

        const [userRes, sinistresRes] = await Promise.all([
          axios.get('/api/user', headers),
          axios.get('/api/sinistres-agent', headers),
        ]);
        
        setUser(userRes.data);
        setSinistres(sinistresRes.data);
        setFilteredSinistres(sinistresRes.data);

      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = sinistres.filter((sinistre) =>
      sinistre.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sinistre.contrat?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sinistre.statut.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSinistres(filtered);
  }, [searchQuery, sinistres]);

  const handleLogout = () => {
    axios.post('api/logout', {}, { withCredentials: true })
      .then(() => navigate('/Connexion'))
      .catch((err) => console.error('Erreur de déconnexion', err));
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
          <section className="bg-white/70 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-sm p-6 mb-8">
            <input
              type="text"
              placeholder="Rechercher un sinistre..."
              className="p-2 mb-4 w-full border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 bg-blue-50/50">
                <tr className="border-b border-blue-100/50">
                  <th scope="col" className="px-6 py-3 font-semibold">CLIENT</th>
                  <th scope="col" className="px-6 py-3 font-semibold">CONTRAT</th>
                  <th scope="col" className="px-6 py-3 font-semibold">STATUT</th>
                  <th scope="col" className="px-6 py-3 font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredSinistres.length > 0 ? (
                  filteredSinistres.map((sinistre, index) => (
                    <tr 
                      key={sinistre.id} 
                      className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'} 
                        hover:bg-blue-100/20 
                        transition-colors 
                        duration-200
                        border-b border-blue-100/30
                      `}
                    >
                      <td className="px-6 py-4">{sinistre.user?.name || 'Inconnu'}</td>
                      <td className="px-6 py-4">{sinistre.contrat?.name || 'Non spécifié'}</td>
                      <td className="px-6 py-4"> 
                        <span className={`
                          px-2 py-1 text-xs rounded-full 
                          transition-colors duration-200
                          ${sinistre.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                            sinistre.statut === 'approuvé' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'}
                        `}>
                          {sinistre.statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <Link 
                          to={`/details-sinistre/${sinistre.id}`} 
                          className={`
                            text-blue-600 
                            hover:text-blue-900 
                            transition-colors 
                            duration-200 
                            rounded-full 
                            p-1 
                            hover:bg-blue-100
                          `}
                        >
                          Voir les détails
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Aucun sinistre trouvé.</td>
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

export default SinistresAgent;
