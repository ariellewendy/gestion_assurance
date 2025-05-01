import { Menu, Search, Bell } from "lucide-react";

const Navbar = ({ sidebarOpen, setSidebarOpen, user, searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="mr-4 text-gray-500" aria-label="Open sidebar">
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">
            {user ? `Bienvenue, ${user.name}` : "Bienvenue"}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="flex items-center bg-gray-100/80 rounded-full px-3 py-1.5">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="bg-transparent border-none outline-none ml-2 text-sm w-40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition-all" aria-label="Notifications">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
