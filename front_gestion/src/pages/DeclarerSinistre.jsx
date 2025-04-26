import { useState } from "react";
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function DeclarerSinistre() {
  const [police, setPolice] = useState("");
  const [typeIncident, setTypeIncident] = useState("");
  const [dateSinistre, setDateSinistre] = useState("");
  const [lieuSinistre, setLieuSinistre] = useState("");
  const [description, setDescription] = useState("");
  const [montantEstime, setMontantEstime] = useState("");
  const [documents, setDocuments] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('document: ', documents[0]);
    console.log('document: ', documents[1]);
    console.log('document: ', documents[2]);
    
    const formData = new FormData();
    formData.append("police", police);
    formData.append("type_incident", typeIncident);
    formData.append("date_sinistre", dateSinistre);
    formData.append("lieu_sinistre", lieuSinistre);
    formData.append("description", description);
    formData.append("montant_estime", montantEstime);
    formData.append("confirmation", confirmation ? "1" : "0");
    
    formData.append("documents", documents[0]);
  
    // documents.forEach((file, i) => {
      // formData.append(`documents[]`, file);
    // });
  
    
    
    try {
      const response = await axios.post("http://localhost:8000/api/sinistres", formData);
      console.log('Data: ', response.data);
      
      // {
      //   withCredentials: true,

      // }
      // headers: {
        
      //   "Content-Type": "multipart/form-data",
      //   'X-Requested-With': 'XMLHttpRequest',
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      
      // },
  
      console.log("Réponse reçue :", response.data);
      alert("Sinistre soumis avec succès !");
    } catch (error) {
      console.error("Erreur lors de la soumission :", error.response?.data || error.message);
      alert("Échec de la soumission du sinistre.");
    }
  };
  
  
  return (
    <div className="bg-gray-100 min-h-screen p-4 mt-10">
      <div className="bg-white rounded-lg shadow p-4 md:p-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">Déclarer un sinistre</h2>
        <p className="text-gray-700 text-sm mb-2">
          Veuillez détailler avec précision les circonstances de l'incident afin que nous puissions traiter votre demande
          rapidement.
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Police d'assurance et Type d'incident (sur la même ligne) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="police" className="block text-gray-700 text-xs font-bold mb-1">
                Police d'assurance *
              </label>
              <select
                id="police"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                value={police}
                onChange={(e) => setPolice(e.target.value)}
                required
              >
                <option value="">Sélectionner</option>
                <option value="auto">Auto</option>
                <option value="habitation">Habitation</option>
              </select>
            </div>

            <div>
              <label htmlFor="typeIncident" className="block text-gray-700 text-xs font-bold mb-1">
                Type d'incident *
              </label>
              <select
                id="typeIncident"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                value={typeIncident}
                onChange={(e) => setTypeIncident(e.target.value)}
                required
              >
                <option value="">Sélectionner</option>
                <option value="accident">Accident</option>
                <option value="vol">Vol</option>
              </select>
            </div>
          </div>

          {/* Date du sinistre et Lieu du sinistre (sur la même ligne) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="dateSinistre" className="block text-gray-700 text-xs font-bold mb-1">
                Date du sinistre * (jj/mm/aaaa)
              </label>
              <input
                type="date"
                id="dateSinistre"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                value={dateSinistre}
                onChange={(e) => setDateSinistre(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="lieuSinistre" className="block text-gray-700 text-xs font-bold mb-1">
                Lieu du sinistre *
              </label>
              <input
                type="text"
                id="lieuSinistre"
                className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                value={lieuSinistre}
                onChange={(e) => setLieuSinistre(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description détaillée */}
          <div>
            <label htmlFor="description" className="block text-gray-700 text-xs font-bold mb-1">
              Description détaillée *
            </label>
            <textarea
              id="description"
              rows="3"
              className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les circonstances"
              required
            />
          </div>

          {/* Montant estimé */}
          <div>
            <label htmlFor="montantEstime" className="block text-gray-700 text-xs font-bold mb-1">
              Montant estimé *
            </label>
            <input
              type="number"
              id="montantEstime"
              className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
              value={montantEstime}
              onChange={(e) => setMontantEstime(e.target.value)}
              required
            />
          </div>

          {/* Documents justificatifs */}
          <div>
            <label htmlFor="documents" className="block text-gray-700 text-xs font-bold mb-1">
              Documents justificatifs *
            </label>
            <div className="border-2 border-dashed rounded-md p-2 text-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Glisser-déposer ou cliquer</p>
                  {/* <button type="button" className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1 rounded focus:outline-none focus:shadow-outline text-xs mt-2">
                    Soumettre
                  </button> */}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={(e) => setDocuments(Array.from(e.target.files))}
                />
              </label>
              {documents.length > 0 && (
                <div className="mt-1">
                  {documents.map((file, index) => (
                    <p key={index} className="text-xxs text-gray-600">{file.name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-2 rounded relative text-xs" role="alert">
            <strong className="font-bold">Important:</strong>
            <span className="block sm:inline"> Fausse déclaration = Fraude.</span>
          </div>

          {/* Confirmation */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="confirmation"
              className="w-3 h-3 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.checked)}
              required
            />
            <label htmlFor="confirmation" className="ml-1 text-gray-900 text-xs">
              Je confirme l'exactitude des informations.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button type="button" className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1 rounded focus:outline-none focus:shadow-outline text-xs">
              Annuler
            </button>
            <button type="submit" className="bg-orange-500 text-white hover:bg-orange-700 px-4 py-1 rounded focus:outline-none focus:shadow-outline text-xs">
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
