import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContratForm = () => {
    const [formData, setFormData] = useState({
        type_assurance: '',
        date_effet: '',
        date_expiration: '',
        description: '',
        prime: '',
        details: {}
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
                setCsrfToken(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du jeton CSRF:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        const token=localStorage.getItem("token");


        e.preventDefault();
        axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }); 
            const response = await axios.post(
                'http://localhost:8000/api/contrats',
                formData,
                {
                    withCredentials: true, 
                }
            );
            console.log('Réponse du serveur:', response.data);
            navigate('/Dashboard_agent');
        } catch (error) {
            console.error('Détails de l\'erreur:', error);
            console.error('Réponse d\'erreur:', error.response);
            setError(error.response?.data?.message || 'Erreur lors de la création du contrat.');

        }
    };
    
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">Créer un contrat d'assurance</h1>
            {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              
                <div>
                    <label htmlFor="type_assurance" className="block text-sm font-medium text-gray-700">Type d'assurance</label>
                    <select
                        name="type_assurance"
                        id="type_assurance"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un type</option>
                        <option value="auto">Auto</option>
                        <option value="habitation">Habitation</option>
                        <option value="sante">Santé</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date_effet" className="block text-sm font-medium text-gray-700">Date d'effet</label>
                    <input
                        type="date"
                        name="date_effet"
                        id="date_effet"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="date_expiration" className="block text-sm font-medium text-gray-700">Date d'expiration</label>
                    <input
                        type="date"
                        name="date_expiration"
                        id="date_expiration"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="prime" className="block text-sm font-medium text-gray-700">Prime</label>
                    <input
                        type="number"
                        name="prime"
                        id="prime"
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Créer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContratForm;
