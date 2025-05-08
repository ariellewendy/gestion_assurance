import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default function DeclarerSinistre() {
  const [police, setPolice] = useState("");
  const [typeIncident, setTypeIncident] = useState("");
  const [dateSinistre, setDateSinistre] = useState("");
  const [lieuSinistre, setLieuSinistre] = useState("");
  const [description, setDescription] = useState("");
  const [montantEstime, setMontantEstime] = useState("");
  const [documents, setDocuments] = useState([]);
  const [confirmation, setConfirmation] = useState(false); 
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("police", police);
    formData.append("type_incident", typeIncident);
    formData.append("date_sinistre", dateSinistre);
    formData.append("lieu_sinistre", lieuSinistre);
    formData.append("description", description);
    formData.append("montant_estime", montantEstime);

    documents.forEach((file) => {
      formData.append("documents[]", file);
    });

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const res = await axios.post("http://localhost:8000/api/sinistres", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      alert("Sinistre soumis avec succès !");
      console.log(res.data);
    } catch (err) {
      alert("Erreur lors de la soumission.");
    }
  };

  return (
    <>
      {/* Navbar moderne et transparente */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur shadow-sm h-14 flex items-center px-8 justify-between">
        <div className="flex items-center">
          <span
            className="w-8 h-8 flex items-center justify-center rounded-xl font-bold text-white mr-2 text-base"
            style={{
              background: 'linear-gradient(135deg, #e66465 0%, #6c63ff 50%, #42a5f5 100%)'
            }}
          >
            IG
          </span>
          <span className="font-semibold text-gray-800 text-lg">InsureGo</span>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 text-blue-700 text-sm font-medium bg-transparent px-2 py-1 rounded-md transition hover:bg-blue-50 hover:text-blue-900 focus:outline-none"
            onClick={() => navigate("/Dashboard")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
            Dashboard
          </button>
          <button
            className="flex items-center gap-1 text-blue-700 text-sm font-medium bg-transparent px-2 py-1 rounded-md transition hover:bg-blue-50 hover:text-blue-900 focus:outline-none"
            onClick={() => navigate("/ProfilePage")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Profil
          </button>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-blue-100/60 via-white/80 to-pink-50/60 min-h-screen flex items-center justify-center pt-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col gap-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Déclarer un sinistre</h2>
            <p className="text-gray-600 text-sm">
              Veuillez détailler les circonstances de l'incident pour accélérer le traitement de votre demande.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Numéro de police</label>
              <input
                type="text"
                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none placeholder:text-blue-400 text-sm"
                placeholder="Entrer votre numéro de police"
                value={police}
                onChange={e => setPolice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Type d'incident</label>
              <select
                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                value={typeIncident}
                onChange={e => setTypeIncident(e.target.value)}
                required
              >
                <option value="">Sélectionner le type d'incident</option>
                <option value="accident">Accident</option>
                <option value="vol">Vol</option>
                <option value="incendie">Incendie</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Date du sinistre</label>
              <input
                type="date"
                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                value={dateSinistre}
                onChange={e => setDateSinistre(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Description de l'incident</label>
              <textarea
                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                rows={3}
                placeholder="Décrivez l'incident en détail"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Lieu du sinistre</label>
              <input
                type="text"
                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                placeholder="Lieu précis de l'incident"
                value={lieuSinistre}
                onChange={e => setLieuSinistre(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Montant estimé</label>
              <input
                type="number"
                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                placeholder="Montant estimé"
                value={montantEstime}
                onChange={e => setMontantEstime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Documents justificatifs</label>
              <input
                type="file"
                className="block w-full text-sm text-gray-600 bg-blue-50/50 border border-blue-100 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700"
                multiple
                onChange={handleFileChange}
              />
              {documents.length > 0 && (
                <ul className="mt-1 text-xs text-gray-500">
                  {documents.map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="confirmation"
                className="w-4 h-4 accent-blue-500"
                checked={confirmation}
                onChange={e => setConfirmation(e.target.checked)}
                required
              />
              <label htmlFor="confirmation" className="text-xs text-gray-700">
                Je confirme l'exactitude des informations fournies.
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-pink-400 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-pink-500 transition"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </>
  );
}