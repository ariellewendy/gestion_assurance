import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const CreateAgentForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        prenom: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: '',
        role: 'agent'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
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
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:8000/api/agents', formData);
                alert('Agent créé avec succès');
                navigate('/admin/dashboard');
            } catch (error) {
                console.error('Erreur lors de la création de l\'agent', error);
                alert('Erreur lors de la création de l\'agent');
            }
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
                        onClick={() => navigate("/admin/dashboard")}
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Créer un Agent</h2>
                        <p className="text-gray-600 text-sm">
                            Veuillez remplir tous les champs pour créer un nouvel agent.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Nom</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none placeholder:text-blue-400 text-sm"
                                placeholder="Entrer le nom"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none placeholder:text-blue-400 text-sm"
                                placeholder="Entrer le prénom"
                                required
                            />
                            {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none placeholder:text-blue-400 text-sm"
                                placeholder="Entrer l'email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 focus:ring-2 focus:ring-blue-200 outline-none placeholder:text-blue-400 text-sm"
                                placeholder="Entrer le mot de passe"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
        </>
    );
};

export default CreateAgentForm;
