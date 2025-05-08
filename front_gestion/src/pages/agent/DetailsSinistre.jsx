import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/agent/Navbar';
import Sidebar from '../../components/agent/Sidebar';

const DetailsSinistre = () => {
  const { id } = useParams();
  const [sinistre, setSinistre] = useState(null);
  const [statut, setStatut] = useState('');
  const [contrats, setContrats] = useState([]);
  const [selectedContrat, setSelectedContrat] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchSinistre = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/sinistres/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setSinistre(data);
        setStatut(data.statut || '');
      } catch (error) {
        setMessage({ type: 'error', text: "Erreur lors du chargement du sinistre." });
      } finally {
        setLoading(false);
      }
    };

    const fetchContrats = async () => {
      try {
        const response = await axios.get('/api/contrats', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (Array.isArray(response.data.contrats)) {
          setContrats(response.data.contrats);
        } else {
          setContrats([]);
        }
      } catch (error) {
        setMessage({ type: 'error', text: "Erreur lors du chargement des contrats." });
        setContrats([]);
      }
    };

    fetchSinistre();
    fetchContrats();
  }, [id]);

  const handleUpdateStatut = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/sinistres/${id}/statut`, { statut }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSinistre((prev) => ({ ...prev, statut }));
      setMessage({ type: 'success', text: "Statut mis à jour avec succès." });
    } catch (error) {
      setMessage({ type: 'error', text: "Échec de la mise à jour du statut." });
    }
  };

  const handleAssocierContrat = async () => {
    if (!selectedContrat) {
      setMessage({ type: 'error', text: "Veuillez sélectionner un contrat." });
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/sinistres/${id}/associer-contrat`, {
        contrat_id: selectedContrat,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: 'success', text: "Contrat associé avec succès." });
    } catch (error) {
      setMessage({ type: 'error', text: "Échec de l'association du contrat." });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-gray-600 text-lg">Chargement...</div>
          </main>
        </div>
      </div>
    );
  }
  if (!sinistre) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-red-600 text-lg">Aucun sinistre trouvé.</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">
          {/* Header card */}
          <div className="bg-white/90 rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Sinistre #{sinistre.id}
              </h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                  ${sinistre.statut === 'approuvé'
                    ? 'bg-green-50 text-green-700'
                    : sinistre.statut === 'en_attente'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'}`}>
                  {sinistre.statut || 'Non défini'}
                </span>
              </div>
            </div>
            {/* <div className="mt-4 md:mt-0 flex gap-2">
              <button
                onClick={handleUpdateStatut}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              >
                Mettre à jour le statut
              </button>
              <button
                onClick={handleAssocierContrat}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              >
                Associer un contrat
              </button>
            </div> */}
          </div>

          {/* Message d’état */}
          {message.text && (
            <div className={`mb-4 rounded p-3 text-center font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Infos sinistre */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Informations du sinistre</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
              <div><strong>Police :</strong> {sinistre.police}</div>
              <div><strong>Type d'incident :</strong> {sinistre.type_incident}</div>
              <div><strong>Date :</strong> {sinistre.date_sinistre}</div>
              <div><strong>Lieu :</strong> {sinistre.lieu_sinistre}</div>
              <div className="md:col-span-2"><strong>Description :</strong> {sinistre.description}</div>
              <div><strong>Montant estimé :</strong> {sinistre.montant_estime} €</div>
            </div>
          </div>

          {/* Modifier le statut */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Modifier le statut</h3>
            <input
              type="text"
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
              className="w-full border border-blue-200 focus:border-blue-600 px-3 py-2 rounded mb-3 focus:outline-none"
            />
            <button
              onClick={handleUpdateStatut}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            >
              Mettre à jour
            </button>
          </div>

          {/* Associer à un contrat */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Associer à un contrat</h3>
            <select
              value={selectedContrat}
              onChange={(e) => setSelectedContrat(e.target.value)}
              className="w-full border border-blue-200 focus:border-blue-600 px-3 py-2 rounded mb-3 focus:outline-none"
            >
              <option value="">Sélectionnez un contrat</option>
              {contrats.map((contrat) => (
                <option key={contrat.id} value={contrat.id}>
                  {contrat.numero_police}
                </option>
              ))}
            </select>
            <button
              onClick={handleAssocierContrat}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-200 transition"
            >
              Associer le contrat
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsSinistre;





























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const DetailsSinistre = () => {
//   const { id } = useParams();
//   const [sinistre, setSinistre] = useState(null); 
//   const [statut, setStatut] = useState('');
//   const [contrats, setContrats] = useState([]);
//   const [selectedContrat, setSelectedContrat] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const fetchSinistre = async () => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(`/api/sinistres/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         });
//         setSinistre(data);
//         setStatut(data.statut || '');
//       } catch (error) {
//         setMessage({ type: 'error', text: "Erreur lors du chargement du sinistre." });
//       } 
//       finally {
//         setLoading(false);
//       }
//     };

//     const fetchContrats = async () => {
//       try {
//         const response = await axios.get('/api/contrats', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         });
//         if (Array.isArray(response.data.contrats)) {
//           setContrats(response.data.contrats);
//         } else {
//           setContrats([]);
//         }
//       } catch (error) {
//         console.log(error);
//         setMessage({ type: 'error', text: "Erreur lors du chargement des contrats." });
//         setContrats([]);
//       }
//     };

//     fetchSinistre();
//     fetchContrats();
//   }, [id]);

//   const handleUpdateStatut = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.put(`/api/sinistres/${id}/statut`, { statut }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSinistre((prev) => ({ ...prev, statut }));
//       setMessage({ type: 'success', text: "Statut mis à jour avec succès." });
//     } catch (error) {
//       setMessage({ type: 'error', text: "Échec de la mise à jour du statut." });
//     }
//   };

//   const handleAssocierContrat = async () => {
//     if (!selectedContrat) {
//       setMessage({ type: 'error', text: "Veuillez sélectionner un contrat." });
//       return;
//     }
//     const token = localStorage.getItem('token');
//     try {
//       await axios.put(`/api/sinistres/${id}/associer-contrat`, {
//         contrat_id: selectedContrat,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage({ type: 'success', text: "Contrat associé avec succès." });
//     } catch (error) {
//       setMessage({ type: 'error', text: "Échec de l'association du contrat." });
//     }
//   };

//   if (loading) return <p>Chargement...</p>;
//   if (!sinistre) return <p>Aucun sinistre trouvé.</p>;

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg mt-8">
//       <h2 className="text-2xl font-bold mb-4">Détails du Sinistre #{sinistre.id}</h2>

//       {message.text && (
//         <p className={`mb-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
//           {message.text}
//         </p>
//       )}

//       <div className="space-y-2 text-gray-700">
//         <p><strong>Police :</strong> {sinistre.police}</p>
//         <p><strong>Type d'incident :</strong> {sinistre.type_incident}</p>
//         <p><strong>Date :</strong> {sinistre.date_sinistre}</p>
//         <p><strong>Lieu :</strong> {sinistre.lieu_sinistre}</p>
//         <p><strong>Description :</strong> {sinistre.description}</p>
//         <p><strong>Montant estimé :</strong> {sinistre.montant_estime} €</p>
//         <p><strong>Statut actuel :</strong> {sinistre.statut || 'Non défini'}</p>
//       </div>

//       <div className="mt-6">
//         <label className="block mb-2">Modifier le statut :</label>
//         <input
//           type="text"
//           value={statut}
//           onChange={(e) => setStatut(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button
//           onClick={handleUpdateStatut}
//           className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
//         >
//           Mettre à jour
//         </button>
//       </div>

//       <div className="mt-6">
//         <label className="block mb-2 font-semibold">Associer à un contrat :</label>
//         <select
//           value={selectedContrat}
//           onChange={(e) => setSelectedContrat(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="">Sélectionnez un contrat </option>
//           {contrats.length > 0 ? (
//             contrats.map((contrat) => (
//               <option key={contrat.id} value={contrat.id}>
//                 {contrat.numero_police}
//               </option>
//             ))
//           ) : (
//             <option disabled>Aucun contrat disponible</option>
//           )}
//         </select>
//         <button
//           onClick={handleAssocierContrat}
//           className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Associer le contrat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DetailsSinistre;
