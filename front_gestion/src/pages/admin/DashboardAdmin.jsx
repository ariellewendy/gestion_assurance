import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleAlert,
  Info,
  AlertTriangle,
  FileText,
  CheckCircle,
  Calendar,
  Home,
  User,
  Users,
  Settings,
  BarChart2,
  Menu,
  Bell,
  LogOut,
  UserPlus,
  Search,
} from "lucide-react";

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-100/80 via-white/70 to-pink-50/80">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-white/70 backdrop-blur-md border-r border-gray-200/50 shadow-lg flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200/50">
          <div className={`flex items-center ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="h-8 w-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            {sidebarOpen && <span className="ml-2 font-semibold text-gray-800">InsureGo</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`text-gray-500 ${!sidebarOpen && "hidden"}`}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="p-4 flex-1">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-gray-400 uppercase mb-4">{sidebarOpen ? "MAIN" : ""} </div>

            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Home size={20} /> {sidebarOpen && <span className="ml-3">Tableau de bord</span>} </a><a href="#"className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all" >
              <BarChart2 size={20} />{sidebarOpen && <span className="ml-3">Statistiques</span>}
            </a>

            <a href="/CreateAgentForm" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <UserPlus size={20} /> {sidebarOpen && <span className="ml-3">Ajouter un agent</span>}
          </a>
           
           <a href="/admin/clients" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
                <Users size={20} /> {sidebarOpen && <span className="ml-3">Clients</span>}
           </a>
           
            <a href="#" className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
            ><Settings size={20} />{sidebarOpen && <span className="ml-3">Paramètres</span>}
            </a>
          </div>
        </nav>

        <a href="/ProfilePage"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
            ><User size={20} /> {sidebarOpen && <span className="ml-3">Mon Profil </span>}
            </a>

        <div className="p-4 border-t border-gray-200/50">
          <a
            href="#"
            className="flex items-center p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3">Déconnexion</span>}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 text-gray-500"
                  aria-label="Open sidebar"
                >
                  <Menu size={20} />
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-800">Bienvenue, Mason</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center bg-gray-100/80 rounded-full px-3 py-1.5">
                  <Search size={16} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="bg-transparent border-none outline-none ml-2 text-sm w-40"
                    aria-label="Search"
                  />
                </div>
              </div>

              <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition-all" aria-label="Notifications">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-md border border-blue-100/50 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center p-5">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <FileText size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Total polices actives</div>
                  <div className="text-2xl font-bold text-gray-800">3</div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md border border-green-100/50 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center p-5">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <CheckCircle size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Total sinistres</div>
                  <div className="text-2xl font-bold text-gray-800">3</div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md border border-orange-100/50 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center p-5">
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  <Calendar size={24} />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Prochaine échéance</div>
                  <div className="text-lg font-bold text-gray-800">16 novembre 2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau Mes Polices d'Activités */}
          <section className="bg-white/70 backdrop-blur-md border border-gray-100/50 rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Polices d'Activités</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-4 py-3 text-left font-medium text-gray-600">TYPE</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">NUMERO DE POLICE</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">DATE D'EFFET</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">DATE D'EXPIRATION</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
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
                  <tr className="bg-gray-50 border-b">
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
                  <tr>
                    <td className="px-4 py-2">Santé</td>
                    <td className="px-4 py-2">SAN-2024-134</td>
                    <td className="px-4 py-2">2023-01-15</td>
                    <td className="px-4 py-2">2025-01-15</td>
                    <td className="px-4 py-2">
                      <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                        Voir les détails
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">
                Voir toutes les polices
              </button>
            </div>
          </section>

      
        </main>
      </div>
    </div>
  );
}
