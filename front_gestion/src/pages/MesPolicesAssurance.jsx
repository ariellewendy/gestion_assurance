import { useState } from "react";
import { Search, Filter } from "lucide-react";

export default function MesPolicesAssurance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous les types");

  const policies = [
    { type: "Auto", numero: "AUT-2023-1234", effet: "2023-01-15", expiration: "2025-01-15", statut: "Expire" },
    { type: "Auto", numero: "AUT-2023-1234", effet: "2023-01-15", expiration: "2025-01-15", statut: "Expire" },
    { type: "Sante", numero: "SAN-2024-134", effet: "2023-01-15", expiration: "2025-01-15", statut: "Expire" },
  ];

  return (
    // <div className="bg-gray-100 min-h-screen p-4 mt-18">
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-white p-18">

      <div className="max-w-5xl mx-auto space-y-4">
        {/* Top Section (Search & Filter) */}
        <div className="bg-white rounded-lg shadow p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Mes polices d'assurance</h2>
              <p className="text-gray-600 text-lg">Gérer toute vos polices d'assurance!</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-base">
              Ajouter une police
            </button>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5">
              <Search className="text-gray-500 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Rechercher par numero ou type..."
                className="bg-gray-100 outline-none text-base w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end space-x-3">
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5">
                <Filter className="text-gray-500 w-5 h-5 mr-2" />
                <select
                  className="bg-gray-100 outline-none text-base"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option>Tous les types</option>
                  <option>Auto</option>
                  <option>Sante</option>
                </select>
              </div>
              <button className="text-blue-500 text-base">Réinitialiser</button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-base text-gray-700">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">TYPE</th>
                  <th className="px-4 py-2 text-left">NUMERO DE POLICE</th>
                  <th className="px-4 py-2 text-left">DATE D'EFFET</th>
                  <th className="px-4 py-2 text-left">DATE D'EXPIRATION</th>
                  <th className="px-4 py-2 text-left">STATUT</th>
                  <th className="px-4 py-2 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                    <td className="px-4 py-2">{policy.type}</td>
                    <td className="px-4 py-2">{policy.numero}</td>
                    <td className="px-4 py-2">{policy.effet}</td>
                    <td className="px-4 py-2">{policy.expiration}</td>
                    <td className="px-4 py-2">
                      <span className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xs">{policy.statut}</span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm">Voir les détails</button>
                      <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm ml-1">Renouveler</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
