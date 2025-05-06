import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';

const SinistresAgent = () => {
  const [sinistres, setSinistres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/sinistres-agent', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setSinistres(response.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des sinistres :', err);
        setError("Impossible de charger les sinistres. Veuillez réessayer plus tard.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Sinistres de mes clients</h1>

      {loading ? (
        <p className="text-gray-600">Chargement en cours...</p>
      ) : error ? (
        <div className="text-red-600 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : sinistres.length === 0 ? (
        <div className="text-yellow-600 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <p>Aucun sinistre trouvé pour cet agent.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                {/* <th className="py-3 px-4 text-left">ID</th> */}
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Contrat</th>
                <th className="py-3 px-4 text-left">Statut</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sinistres.map((sinistre) => (
                <tr key={sinistre.id} className="border-t hover:bg-gray-50">
                  {/* <td className="py-3 px-4">{sinistre.id}</td> */}
                  <td className="py-3 px-4">{sinistre.user?.name || 'Inconnu'}</td>
                  <td className="py-3 px-4">{sinistre.contrat?.name || 'Non spécifié'}</td>
                  <td className="py-3 px-4"> 
                    <span className={`px-2 py-1 text-xs rounded-full
                      ${sinistre.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' :
                        sinistre.statut === 'approuvé' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}>
                      {sinistre.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`/details-sinistre/${sinistre.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Voir les détails
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SinistresAgent;
