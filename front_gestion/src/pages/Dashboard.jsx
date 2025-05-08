import React from "react";
import {
  FileText,
  CheckCircle,
  Calendar,
  AlertTriangle,
  Info,
  CircleAlert,
  User,
  LogOut,
  Gift,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/connexion");
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Navbar semi-transparente */}
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
        <span className="text-lg font-bold text-blue-900 tracking-wide">Mon Espace Client</span>
      </nav>

      {/* Sidebar semi-transparente */}
      <aside className="w-60 bg-white/70 backdrop-blur shadow flex flex-col py-8 px-4 pt-20 relative">
        <nav className="flex flex-col gap-2">
          <button
            className="flex items-center gap-2 text-blue-700 font-medium bg-blue-50 rounded px-3 py-2 transition hover:bg-blue-100"
            onClick={() => navigate("/dashboard")}
          >
            <FileText size={18} /> Tableau de bord
          </button>
          <button
            className="flex items-center gap-2 text-gray-700 rounded px-3 py-2 transition hover:bg-orange-100"
            onClick={() => navigate("/DeclarerSinistre")}
          >
            <AlertTriangle size={18} /> Déclarer un sinistre
          </button>
          <button
            className="flex items-center gap-2 text-gray-700 rounded px-3 py-2 transition hover:bg-blue-100"
            onClick={() => navigate("/ProfilePage")}
          >
            <User size={18} /> Profil
          </button>
          <button
            className="flex items-center gap-2 text-gray-700 rounded px-3 py-2 transition hover:bg-green-100"
            onClick={() => navigate("/offres")}
          >
            <Gift size={18} /> Nos offres
          </button>
        </nav>
        {/* Bouton de déconnexion en bas */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 bg-red-50 hover:bg-red-100 rounded px-3 py-2 mt-auto transition absolute bottom-8 left-4 right-4"
        >
          <LogOut size={18} /> Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-16 py-10 pt-24">
        {/* Header */}
      
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center bg-white rounded-lg shadow p-5">
            <FileText className="mr-4 text-blue-500" size={32} />
            <div>
              <div className="text-xl font-semibold text-gray-900">3</div>
              <div className="text-sm text-gray-500">Polices actives</div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg shadow p-5">
            <CheckCircle className="mr-4 text-green-500" size={32} />
            <div>
              <div className="text-xl font-semibold text-gray-900">3</div>
              <div className="text-sm text-gray-500">Sinistres</div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg shadow p-5">
            <Calendar className="mr-4 text-orange-500" size={32} />
            <div>
              <div className="text-xl font-semibold text-gray-900">16 nov. 2025</div>
              <div className="text-sm text-gray-500">Prochaine échéance</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Mes Polices d'Activités</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-normal text-gray-600">Type</th>
                  <th className="px-4 py-2 text-left font-normal text-gray-600">Numéro</th>
                  <th className="px-4 py-2 text-left font-normal text-gray-600">Effet</th>
                  <th className="px-4 py-2 text-left font-normal text-gray-600">Expiration</th>
                  <th className="px-4 py-2 text-left font-normal text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-white hover:bg-blue-50 transition">
                  <td className="px-4 py-2">Auto</td>
                  <td className="px-4 py-2">AUT-2023-1234</td>
                  <td className="px-4 py-2">2023-01-15</td>
                  <td className="px-4 py-2">2025-01-15</td>
                  <td className="px-4 py-2">
                    <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                      Voir les détails
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50 hover:bg-blue-50 transition">
                  <td className="px-4 py-2">Santé</td>
                  <td className="px-4 py-2">SAN-2024-134</td>
                  <td className="px-4 py-2">2023-03-11</td>
                  <td className="px-4 py-2">2025-03-11</td>
                  <td className="px-4 py-2">
                    <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                      Voir les détails
                    </button>
                  </td>
                </tr>
                {/* Ajoutez d'autres lignes ici */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg mb-3 border-b pb-2 text-gray-900">Notifications</h2>
          <div className="space-y-3">
            <div className="flex items-start bg-yellow-50 rounded p-3 border border-yellow-100">
              <span className="bg-yellow-200 p-2 rounded-full mr-3">
                <CircleAlert className="text-yellow-500" size={22} />
              </span>
              <div>
                <div className="font-semibold text-yellow-800">Échéance à venir</div>
                <div className="text-sm text-yellow-900">
                  Votre police auto expire dans 15 jours, pensez à renouveler
                </div>
                <div className="text-xs text-gray-500 mt-1">il y a 3 jours</div>
              </div>
            </div>
            <div className="flex items-start bg-blue-50 rounded p-3 border border-blue-100">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <Info className="text-blue-500" size={22} />
              </span>
              <div>
                <div className="font-semibold text-blue-800">Mise à jour du sinistre</div>
                <div className="text-sm text-blue-900">
                  Votre déclaration de sinistre a été mise à jour. Vérifiez les détails.
                </div>
                <div className="text-xs text-gray-500 mt-1">il y a 5 jours</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}