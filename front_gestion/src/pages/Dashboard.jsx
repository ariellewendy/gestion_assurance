import React from "react";
import { useNavigate } from "react-router-dom";
import {
    CircleAlert,
    Info,
    AlertTriangle,
    FileText,
    CheckCircle,
    Calendar,
} from "lucide-react";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-white p-18">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    {/* <h1 className="text-lg font-semibold">Tableau de bord</h1> */}
                    <h1 className="text-3xl font-bold text-blue-900 mb-6">Tableau de bord</h1>

                    <p className="text-sm text-gray-600">Bienvenue sur votre espace personne</p>
                </div>
                <div>
                    <button
                        onClick={() => navigate("/DeclarerSinistre")}
                        className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition mr-4"
                    >
                        <AlertTriangle className="mr-2" size={20} />
                        Declarer un sinistre
                    </button>
                    <button
                        onClick={() => navigate("/ProfilePage")}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        Mon Profil
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center bg-blue-600 text-white rounded-lg p-4">
                    <FileText className="mr-4" size={32} />
                    <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm">Total polices actives</div>
                    </div>
                </div>
                <div className="flex items-center bg-green-600 text-white rounded-lg p-4">
                    <CheckCircle className="mr-4" size={32} />
                    <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm">Total sinistres</div>
                    </div>
                </div>
                <div className="flex items-center bg-orange-500 text-white rounded-lg p-4">
                    <Calendar className="mr-4" size={32} />
                    <div>
                        <div className="text-2xl font-bold">16 novembre 2025</div>
                        <div className="text-sm">Prochaine echeance</div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Mes Polices d'Activites</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">TYPE</th>
                                <th className="px-4 py-2 text-left">NUMERO DE POLICE</th>
                                <th className="px-4 py-2 text-left">DATE D'EFFET</th>
                                <th className="px-4 py-2 text-left">DATE D'EXPIRATION</th>
                                <th className="px-4 py-2 text-left">ACTIONS</th>
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
                                        Voir les details
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
                                        Voir les details
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2">Sante</td>
                                <td className="px-4 py-2">San-2024-134</td>
                                <td className="px-4 py-2">2023-01-15</td>
                                <td className="px-4 py-2">2025-01-15</td>
                                <td className="px-4 py-2">
                                    <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition">
                                        Voir les details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition ">
                        Voir toutes les polices
                    </button>
                </div>
            </div>

            <div className="space-y-8 mt-10">
                {/* Notifications */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold text-lg mb-3 border-b pb-2">Notifications</h2>
                    <div className="space-y-3">
                        {/* Notification 1 */}
                        <div className="flex items-start bg-yellow-100 rounded p-3 border border-yellow-200">
                            <CircleAlert className="text-yellow-500 mt-1 mr-3" size={22} />
                            <div>
                                <div className="font-semibold text-yellow-800">Echeance à venir</div>
                                <div className="text-sm text-yellow-900">
                                    Votre police auto expire dans 15 jours, pensez à renouveler
                                </div>
                                <div className="text-xs text-gray-500 mt-1">il y a 3 jours</div>
                            </div>
                        </div>
                        {/* Notification 2 */}
                        <div className="flex items-start bg-blue-100 rounded p-3 border border-blue-200">
                            <Info className="text-blue-500 mt-1 mr-3" size={22} />
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
            </div>
        </div>
    );
}
