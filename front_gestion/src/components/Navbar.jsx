import { div } from "motion/react-client";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
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
          onClick={() => navigate("/agent/dashboard")}
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
  );
}
