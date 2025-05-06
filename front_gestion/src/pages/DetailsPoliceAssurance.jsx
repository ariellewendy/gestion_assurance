import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Printer, Download, CheckCircle, XCircle } from "lucide-react";

export default function DetailsPoliceAssurance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contrat, setContrat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction de récupération des données du contrat
  const fetchContrat = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/contrats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContrat(response.data.data);
    } catch (err) {
      setError("Impossible de charger les détails du contrat.");
    } finally {
      setLoading(false);
    }
  };

  // Récupération initiale des données du contrat au chargement du composant
  useEffect(() => {
    fetchContrat();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!contrat) return <div>Contrat introuvable</div>;

  // Récupération des garanties incluses et non incluses
  let garantiesIncluses = contrat.details?.garanties || [];
  let garantiesNonIncluses = contrat.details?.garanties_non_incluses || [];

  if (contrat.sinistres && contrat.sinistres.length > 0) {
    contrat.sinistres.forEach((sinistre) => {
      if (sinistre.statut === "accepté" && sinistre.type_incident) {
        if (!garantiesIncluses.includes(sinistre.type_incident)) {
          garantiesIncluses.push(sinistre.type_incident);
        }
      }
      if (sinistre.statut === "rejeté" && sinistre.type_incident) {
        if (!garantiesNonIncluses.includes(sinistre.type_incident)) {
          garantiesNonIncluses.push(sinistre.type_incident);
        }
      }
    });
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-20">
      {/* Bouton retour */}
      <button
        className="flex items-center text-blue-600 mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-2" />
        Retour à la liste des polices
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        {/* Informations sur la police */}
        <section>
          <h1 className="text-2xl font-bold mb-1">{contrat.numero_police}</h1>
          <p className="text-gray-600">Type : {contrat.type_assurance?.toUpperCase()}</p>
        </section>

        {/* Actions */}
        <section className="flex gap-3">
          <button className="flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded">
            <Printer size={16} className="mr-2" />
            Imprimer
          </button>
          <button className="flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded">
            <Download size={16} className="mr-2" />
            Télécharger PDF
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Renouveler
          </button>
        </section>

        {/* Infos générales */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Informations générales</h2>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                contrat.status === "actif" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {contrat.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-medium">Type de police</p>
              <p>{contrat.type_assurance}</p>
            </div>
            <div>
              <p className="font-medium">Numéro de police</p>
              <p>{contrat.numero_police}</p>
            </div>
            <div>
              <p className="font-medium">Date d'effet</p>
              <p>{contrat.date_effet}</p>
            </div>
            <div>
              <p className="font-medium">Date d'expiration</p>
              <p>{contrat.date_expiration}</p>
            </div>
            <div>
              <p className="font-medium">Prime</p>
              <p>{contrat.prime} FCFA</p>
            </div>
            <div>
              <p className="font-medium">Client</p>
              <p>{contrat.client?.name} {contrat.client?.prenom}</p>
            </div>
          </div>
        </section>

        {/* Garanties */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Garanties</h2>
          <div>
            <p className="font-medium text-gray-700 mb-2">Incluses</p>
            <ul className="space-y-2">
              {garantiesIncluses.length > 0 ? (
                garantiesIncluses.map((g, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    {g}
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Aucune</li>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-medium text-gray-700 mb-2">Non incluses</p>
            <ul className="space-y-2">
              {garantiesNonIncluses.length > 0 ? (
                garantiesNonIncluses.map((g, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <XCircle size={16} className="text-red-500 mr-2" />
                    {g}
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Aucune</li>
              )}
            </ul>
          </div>
        </section>

        {/* Sinistres */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sinistres liés à cette police</h2>
          {contrat.sinistres && contrat.sinistres.length > 0 ? (
            contrat.sinistres.map((s, i) => (
              <div key={i} className="border rounded p-3 mb-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-800">{s.numero}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      s.statut === "actif" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.statut}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{s.date}</p>
                <p className="text-gray-700 text-sm">{s.description}</p>
                <button className="text-blue-500 text-sm mt-2 hover:underline">
                  Déclarer un sinistre
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Aucun sinistre lié à cette police.</p>
          )}
        </section>

        {/* Conditions générales */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Conditions générales</h2>
          <p className="text-sm text-gray-700 mb-2">
            Les conditions générales s'appliquent au contrat signé le {contrat.date_effet}.
          </p>
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Télécharger les conditions générales (PDF)
          </a>
        </section>

        {/* Documents */}
        <section className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Documents</h2>
          <ul className="space-y-1 text-sm text-blue-500">
            <li>
              <a href={contrat.document} download>
                Télécharger le contrat d'assurance
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
