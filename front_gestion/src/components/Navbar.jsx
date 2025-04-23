import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-900">InsureGo</h1>
      <div className="space-x-4">
        <Link to="" className="text-gray-800 hover:text-blue-600 font-medium">
          a propos
        </Link>
        <Link to="" className="text-gray-800 hover:text-blue-600 font-medium">
          Nous contacter
        </Link>
      </div>
    </nav>
  );
}
