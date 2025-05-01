import { Menu, Home, Users, Settings, LogOut, User } from "lucide-react";
import NavLink from "./NavLink";

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  return (
    <aside className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-white/70 backdrop-blur-md border-r border-gray-200/50 shadow-lg flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-200/50">
        <div className={`flex items-center ${!sidebarOpen && "justify-center w-full"}`}>
          <div className="h-8 w-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">IG</div>
          {sidebarOpen && <span className="ml-2 font-semibold text-gray-800">InsureGo</span>}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`text-gray-500 ${!sidebarOpen && "hidden"}`} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
      </div>

      <nav className="p-4 flex-1">
        <div className="space-y-2">
          {sidebarOpen && <div className="text-xs font-semibold text-gray-400 uppercase mb-4">Home</div>}
          <NavLink to="/" icon={<Home size={20} />} label="Tableau de bord" sidebarOpen={sidebarOpen} />
          <NavLink to="/clientliste" icon={<Users size={20} />} label="Mes clients" sidebarOpen={sidebarOpen} />
          <NavLink to="#" icon={<Settings size={20} />} label="Paramètres" sidebarOpen={sidebarOpen} />
        </div>
      </nav>

      <NavLink to="/ProfilePage" icon={<User size={20} />} label="Mon Profil" sidebarOpen={sidebarOpen} />
      <div className="p-4 border-t border-gray-200/50">
        <button onClick={handleLogout} className="flex items-center p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all">
          <LogOut size={20} />
          {sidebarOpen && <span className="ml-3">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
