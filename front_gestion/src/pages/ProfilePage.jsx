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
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/connexion');
      });
  }, [navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleUpdate = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/user/profile', form)
      .then(res => alert(res.data.message));
  };
  const handlePasswordChange = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/user/change-password', passwordForm)
      .then(res => alert(res.data.message));
  };
  const handlePhotoUpload = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);
    axios.post('http://localhost:8000/api/user/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => {
      alert(res.data.message);
      setUser(prev => ({ ...prev, profile_photo_path: res.data.photo_url }));
    });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      }}>
      <div className=" w-full max-w-4xl h-[550px] flex rounded-3xl overflow-hidden shadow-2xl">
        <div className="w-1/3 bg-white/30 backdrop-blur-lg flex flex-col items-center py-10 px-4 space-y-6">
          <img
            src={user?.profile_photo_path || 'https://via.placeholder.com/150'}
            alt="profil"
            className="w-24 h-24 rounded-full object-cover border-4 border-white/60 shadow-md"
          />
          <input type="file" onChange={handlePhotoUpload} className="my-2" />
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800">{user?.name} {user?.prenom}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          {/* Navigation (exemple, à personnaliser) */}
          <nav className="flex flex-col gap-4 mt-8 w-full">
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/40 hover:bg-white/60 transition">
              <span role="img" aria-label="profile">👤</span>
              <span className="font-medium text-gray-700">Profil</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/40 transition">
              <span role="img" aria-label="settings">⚙️</span>
              <span className="font-medium text-gray-700">Paramètres</span>
            </button>
          </nav>
        </div>
        <div className="w-2/3 bg-white/40 backdrop-blur-lg px-10 py-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Mon Profil</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Nom" />
            <input type="text" name="prenom" value={form.prenom} onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Prénom" />
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Email" />
            <button type="submit"
              className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">Mettre à jour</button>
          </form>
          <form onSubmit={handlePasswordChange} className="space-y-4 mt-8">
            <input type="password" name="current_password" placeholder="Mot de passe actuel"
              onChange={e => setPasswordForm({ ...passwordForm, current_password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input type="password" name="new_password" placeholder="Nouveau mot de passe"
              onChange={e => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button type="submit"
              className="w-full py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">Changer le mot de passe</button>
          </form>
        </div>
      </div>
    </div>
  );
}
