import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAgentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.name) newErrors.name = 'Nom requis';
        if (!formData.prenom) newErrors.prenom = 'Prénom requis';
        
        if (!formData.email) {
            newErrors.email = 'Email requis';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Format email invalide';
        }
        
        if (!formData.password) {
            newErrors.password = 'Mot de passe requis';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Minimum 8 caractères';
        } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = '1 majuscule et 1 chiffre requis';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:8000/api/admin/create-agent', {
                name: formData.name,
                prenom: formData.prenom,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccessMessage('Agent créé avec succès!');
            setTimeout(() => navigate('/agents'), 2000);
            
        } catch (error) {
            console.error('Erreur:', error.response?.data);
            setErrors({
                submit: error.response?.data.message || 'Erreur lors de la création'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer un nouvel agent</h2>
                
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}
                
                {errors.submit && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                        {errors.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                Prénom
                            </label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.prenom ? 'border-red-500' : ''}`}
                            />
                            {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.password ? 'border-red-500' : ''}`}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            <p className="mt-1 text-xs text-gray-500">
                                Minimum 8 caractères avec 1 majuscule et 1 chiffre
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Créer l'agent
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAgentForm;
