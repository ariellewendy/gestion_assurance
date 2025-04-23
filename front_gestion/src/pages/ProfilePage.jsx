import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', prenom: '', email: '' });
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/connexion');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('http://localhost:8000/api/user')
      .then(res => {
        setUser(res.data);
        setForm({ name: res.data.name, prenom: res.data.prenom, email: res.data.email });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        localStorage.removeItem('token');
        navigate('/connexion');
      });
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/user/profile', form)
      .then(res => alert(res.data.message))
      .catch(error => console.error('Erreur lors de la mise à jour du profil:', error));
  };

  const handlePasswordChange = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/user/change-password', passwordForm)
      .then(res => alert(res.data.message))
      .catch(error => console.error('Erreur lors du changement de mot de passe:', error));
  };

  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);

    axios.post('http://localhost:8000/api/user/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        alert(res.data.message);
        setUser(prevState => ({ ...prevState, profile_photo_path: res.data.photo_url }));
      })
      .catch(error => console.error('Erreur lors du téléchargement de la photo:', error));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Mon Profil</h1>

      {user && (
        <>
          <img
            src={user.profile_photo_path ? user.profile_photo_path : 'https://via.placeholder.com/150'}
            alt="profil"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input type="file" onChange={handlePhotoUpload} className="my-2" />

          <form onSubmit={handleUpdate} className="space-y-2">
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input" placeholder="Nom" />
            <input type="text" name="prenom" value={form.prenom} onChange={handleChange} className="input" placeholder="prenom" />
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input" placeholder="Email" />
            <button type="submit" className="btn">Mettre à jour</button>
          </form>

          <form onSubmit={handlePasswordChange} className="space-y-2 mt-4">
            <input type="password" name="current_password" placeholder="Mot de passe actuel" onChange={e => setPasswordForm({ ...passwordForm, current_password: e.target.value })} className="input" />
            <input type="password" name="new_password" placeholder="Nouveau mot de passe" onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })} className="input" />
            <button type="submit" className="btn">Changer le mot de passe</button>
          </form>
        </>
      )}
    </div>
  );
}
