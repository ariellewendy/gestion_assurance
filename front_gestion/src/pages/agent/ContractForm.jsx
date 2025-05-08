import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const ContratForm = () => {
    const { clientId } = useParams(); 
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        type_assurance: '',
        date_effet: '',
        date_expiration: '',
        description: '',
        prime: '',
        client_id: clientId,
    });

    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/sanctum/csrf-cookie')
            .catch(err => console.error("Erreur CSRF", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
            const res = await axios.post('http://localhost:8000/api/contrats', formData);
            console.log('Contrat créé :', res.data);
            navigate('/Dashboard_agent');
        } catch (err) {
            console.error('Erreur de soumission :', err.response?.data);
            setError(err.response?.data?.message || 'Erreur lors de la création du contrat.');
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
                        onClick={() => navigate("/agent/dashboard")}
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Créer un Contrat</h2>
                        <p className="text-gray-600 text-sm">
                            Veuillez remplir tous les champs pour créer un nouveau contrat.
                        </p>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Type d'Assurance</label>
                            <select
                                name="type_assurance"
                                value={formData.type_assurance}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                                required
                            >
                                <option value="">Sélectionner le type d'assurance</option>
                                <option value="auto">Assurance Auto</option>
                                <option value="habitation">Assurance Habitation</option>
                                <option value="vie">Assurance Vie</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Date d'Effet</label>
                            <input
                                type="date"
                                name="date_effet"
                                value={formData.date_effet}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Date d'Expiration</label>
                            <input
                                type="date"
                                name="date_expiration"
                                value={formData.date_expiration}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                                rows="3"
                                placeholder="Description du contrat"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Prime</label>
                            <input
                                type="number"
                                name="prime"
                                value={formData.prime}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                                placeholder="Montant de la prime"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Créer Contrat
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContratForm;
