const NavLink = ({ to, icon, label, sidebarOpen }) => (
    <a href={to} className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all">
      {icon}
      {sidebarOpen && <span className="ml-3">{label}</span>}
    </a>
  );
  
  export default NavLink;
  