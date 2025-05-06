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
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Créer un contrat d'assurance</h1>

            {error && (
                <div className="text-red-700 bg-red-100 border border-red-400 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="type_assurance" className="block font-medium mb-1">Type d'assurance</label>
                    <select
                        name="type_assurance"
                        onChange={handleChange}
                        value={formData.type_assurance}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Sélectionner</option>
                        <option value="auto">Auto</option>
                        <option value="habitation">Habitation</option>
                        <option value="sante">Santé</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="date_effet" className="block font-medium mb-1">Date d'effet</label>
                    <input
                        type="date"
                        name="date_effet"
                        onChange={handleChange}
                        value={formData.date_effet}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="date_expiration" className="block font-medium mb-1">Date d'expiration</label>
                    <input
                        type="date"
                        name="date_expiration"
                        onChange={handleChange}
                        value={formData.date_expiration}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        rows="3"
                        className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="prime" className="block font-medium mb-1">Prime</label>
                    <input
                        type="number"
                        name="prime"
                        onChange={handleChange}
                        value={formData.prime}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition duration-300"
                    >
                        Créer le contrat
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContratForm;
