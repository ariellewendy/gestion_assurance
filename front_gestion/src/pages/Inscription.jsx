import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function Inscription() {
    const [formData, setFormData] = useState({
        name: '',
        prenom: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
              // axios.defaults.withCredentials = true;
              // axios.defaults.withXSRFToken = true;
              await api.get('http://localhost:8000/sanctum/csrf-cookie');
              console.log('Cookie CSRF récupéré avec succès');
            } catch (error) {
                console.error('Erreur lors de la récupération du cookie CSRF:', error);
            }
        };

        fetchCsrfToken();
      }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log('Envoi des données:', formData);
            const response = await axios.post('http://localhost:8000/api/token-register', 
              formData
            );
            
            console.log('Réponse du serveur:', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/Dashboard');
        } catch (error) {
            console.error('Détails de l\'erreur:', error);
            console.error('Réponse d\'erreur:', error.response);
            setError(error.response?.data?.message || 'Erreur lors de l\'inscription.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
      <>
        <section
            className="relative w-full h-screen bg-cover bg-center pt-20"
            style={{ backgroundImage: "url('/images/im.jpg')" }} 
        >

            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(27, 57, 177, 0.3)" }}
            ></div>

            <div className="relative z-10 flex items-center justify-between h-full px-10 text-white">
                {/* Partie gauche */}
                <div className="w-1/2 transform -translate-y-10">
                    <h1 className="text-4xl font-bold mb-4">
                        Bienvenue dans notre plateforme d'assurance
                    </h1>
                    <p className="text-lg">
                        Simplifiez la gestion de vos contrats et clients en un seul endroit.
                    </p>
                    <div className="flex flex-col items-start gap-4 mt-10">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#F97316] text-white px-6 py-2 rounded shadow hover:bg-orange-600 transition"
                        >
                            Commencer maintenant
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-blue-800 transition"
                        >
                            En savoir plus
                        </button>
                    </div>
                </div>

                {/* Formulaire d'inscription */}
                
                <div className="w-1/3 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg text-gray-900">
                    <div className="flex justify-center gap-6 mb-6 relative">
                        <a
                            href="/connexion"
                            className="relative pb-1 text-black hover:text-blue-600 font-semibold transition group"
                        >
                            Connexion
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a
                            href="/"
                            className="relative pb-1 text-black hover:text-blue-600 font-semibold transition group"
                        >
                            Inscription
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                        </a>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
                                {error}
                            </div>
                        )}

                        {/* Nom */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="nom"
                                className="text-sm font-semibold text-gray-700 mb-1"
                            >
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                id="nom"
                                placeholder="Votre nom"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                required
                                onChange={handleChange}
                                value={formData.name}
                            />

                        </div>

                        {/* Prénom */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="prenom"
                                className="text-sm font-semibold text-gray-700 mb-1"
                            >
                                Prénom <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="prenom"
                                type="text"
                                id="prenom"
                                placeholder="Votre prénom"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                required
                                onChange={handleChange}
                                value={formData.prenom}
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-700 mb-1"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                placeholder="Votre email"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />

                        </div>

                        {/* Mot de passe */}
                        <div className="flex flex-col">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-gray-700 mb-1"
                            >
                                Mot de passe <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                placeholder="Mot de passe"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                                required
                                onChange={handleChange}
                                value={formData.password}
                            />

                        </div>


                        {/* Conditions */}
                        <div className="flex items-center space-x-2">
                            <input
                                name="terms"
                                type="checkbox"
                                id="terms"
                                className="accent-orange-500"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700">
                                J'accepte{" "}
                                <a href="/conditions" className="text-blue-600 hover:underline">
                                    les conditions générales
                                </a>
                            </label>
                        </div>

                        {/* Bouton inscription */}
                        <button
                            type="submit"
                            style={{ backgroundColor: "#F97316" }}
                            className="w-full py-2 rounded text-white transition ">S'inscrire
                        </button>
                    </form>
                </div>
            </div>
        </section>

        {/* Section 2 : Pourquoi choisir notre application ? */}
        <section className="bg-gray-100 py-16 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Pourquoi choisir notre application ?
          </h2>
          <p className="text-gray-600 mb-12">
            Notre plateforme offre des outils puissants pour gérer vos assurances en toute simplicité.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xl">
                  ⭐
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Gestion facilitée</h3>
              <p className="text-gray-600 text-sm">
                Gérer toutes vos polices d'assurances en un endroit, simplement et efficacement
              </p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xl">
                  ✅
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Gestion facilitée</h3>
              <p className="text-gray-600 text-sm">
                Gérer toutes vos polices d'assurances en un endroit, simplement et efficacement
              </p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xl">
                  🔒
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Gestion facilitée</h3>
              <p className="text-gray-600 text-sm">
                Gérer toutes vos polices d'assurances en un endroit, simplement et efficacement
              </p>
            </div>

            <div className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xl">
                  📁
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Gestion facilitée</h3>
              <p className="text-gray-600 text-sm">
                Gérer toutes vos polices d'assurances en un endroit, simplement et efficacement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages clients */}
      <section className="bg-white-100 py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-2">Ce que disent nos clients</h2>
          <p className="text-gray-600 mb-10">
            Découvrez pourquoi des milliers d'utilisateurs font confiance à notre application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Témoignage 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img src="/images/b.jpg" alt="Client 1" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Thomas Dubois</h4>
                  <p className="text-sm text-gray-500">Client depuis 1 an</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Cette application a complètement transformé ma façon de gérer mes assurances. Tout est clair, simple et accessible en quelques clics."
              </p>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow border-2 border-blue-500">
              <div className="flex items-center mb-4">
                <img src="/images/f.jpg" alt="Client 2" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Marie Lefevre</h4>
                  <p className="text-sm text-gray-500">Client depuis 3 ans</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "J'ai déclaré un sinistre en moins de 5 minutes et j'ai pu suivre son traitement en temps réel. Le support client est également très réactif !"
              </p>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img src="/images/ff.jpg" alt="Client 3" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <p className="text-sm text-gray-500">Client depuis 2 ans</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "Cette application a complètement transformé ma façon de gérer mes assurances. Tout est clair, simple et accessible en quelques clics."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F3A65] text-white py-12">
        <div className="text-center text-sm text-gray-400 mt-8">
          © 2025 Estates. All rights reserved | Designed by Group5
        </div>
      </footer>
      </>
    );
}



