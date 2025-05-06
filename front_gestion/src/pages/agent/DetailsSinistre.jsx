import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsSinistre = () => {
  const { id } = useParams();
  const [sinistre, setSinistre] = useState(null);
  const [statut, setStatut] = useState('');
  const [contrats, setContrats] = useState([]);
  const [selectedContrat, setSelectedContrat] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchSinistre = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/sinistres/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (Array.isArray(response.data.contrats)) {
          setContrats(response.data.contrats);
        } else {
          setContrats([]);
        }
      } catch (error) {
        console.log(error);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ type: 'success', text: "Contrat associé avec succès." });
    } catch (error) {
      setMessage({ type: 'error', text: "Échec de l'association du contrat." });
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!sinistre) return <p>Aucun sinistre trouvé.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Détails du Sinistre #{sinistre.id}</h2>

      {message.text && (
        <p className={`mb-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}

      <div className="space-y-2 text-gray-700">
        <p><strong>Police :</strong> {sinistre.police}</p>
        <p><strong>Type d'incident :</strong> {sinistre.type_incident}</p>
        <p><strong>Date :</strong> {sinistre.date_sinistre}</p>
        <p><strong>Lieu :</strong> {sinistre.lieu_sinistre}</p>
        <p><strong>Description :</strong> {sinistre.description}</p>
        <p><strong>Montant estimé :</strong> {sinistre.montant_estime} €</p>
        <p><strong>Statut actuel :</strong> {sinistre.statut || 'Non défini'}</p>
      </div>

      <div className="mt-6">
        <label className="block mb-2">Modifier le statut :</label>
        <input
          type="text"
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          onClick={handleUpdateStatut}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Mettre à jour
        </button>
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-semibold">Associer à un contrat :</label>
        <select
          value={selectedContrat}
          onChange={(e) => setSelectedContrat(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Sélectionnez un contrat </option>
          {contrats.length > 0 ? (
            contrats.map((contrat) => (
              <option key={contrat.id} value={contrat.id}>
                {contrat.numero_police}
              </option>
            ))
          ) : (
            <option disabled>Aucun contrat disponible</option>
          )}
        </select>
        <button
          onClick={handleAssocierContrat}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Associer le contrat
        </button>
      </div>
    </div>
  );
};

export default DetailsSinistre;
