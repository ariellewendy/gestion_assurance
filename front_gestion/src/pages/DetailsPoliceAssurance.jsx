import React from 'react';
import { ArrowLeft, Printer, Download, CheckCircle, XCircle } from 'lucide-react';

export default function DetailsPoliceAssurance() {
  const garantiesIncluses = [
    { name: "Responsabilité civile" },
    { name: "Vol" },
    { name: "Bris de glace" },
    { name: "Dommages tous accidents" },
    { name: "Incendie" },
  ];

  const garantiesNonIncluses = [
    { name: "Responsabilité civile" },
    { name: "Vol" },
    { name: "Bris de glace" },
  ];

  const sinistres = [
    { numero: "2023-1234-SIN", date: "2023-12-03", description: "Collision avec un autre vehicule a douala-cite de palmier", status: "Expire" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 mt-12">
      <div className="flex items-center justify-start mb-6">
          <button className="text-blue-500 flex items-center">
            <ArrowLeft className="mr-1" size={16} />
            Retour au police
          </button>
        </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-start mb-6">
          <button className="text-blue-500 flex items-center">
            <ArrowLeft className="mr-1" size={16} />
            Retour au police
          </button>
        </div>

        {/* Policy Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Police-AUT-2023-124</h1>
          <p className="text-gray-600">AUTO</p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mb-6">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded flex items-center">
            <Printer className="mr-1" size={16} />
            Imprimer
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded flex items-center">
            <Download className="mr-1" size={16} />
            Telecharger le PDF
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Renouveler
          </button>
        </div>

        {/* General Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Informations generales</h2>
            <button className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs">Expire</button>
          </div>
          <p className="text-gray-700 mb-4">Details de votre police assurance</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Type de police</h3>
              <p>AUTO</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Numero de police</h3>
              <p>AUT-2023-1023</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Date d'effet</h3>
              <p>2023-01-02</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Date d'expiration</h3>
              <p>2024-01-14</p>
            </div>
          </div>
        </div>

        {/* Garanties */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Garanties</h2>
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Incluses</h3>
            <ul className="space-y-2">
              {garantiesIncluses.map((garantie, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  <span className="text-gray-700">{garantie.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Non Incluses</h3>
            <ul className="space-y-2">
              {garantiesNonIncluses.map((garantie, index) => (
                <li key={index} className="flex items-center">
                  <XCircle className="text-red-500 mr-2" size={16} />
                  <span className="text-gray-700">{garantie.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sinistres lies a cette police */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Sinistre lies a cette police</h2>
          {sinistres.map((sinistre, index) => (
            <div key={index} className="border rounded-md p-3 mb-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-md font-semibold text-gray-700">{sinistre.numero}</h3>
                <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs">{sinistre.status}</span>
              </div>
              <p className="text-gray-600 text-sm">{sinistre.date}</p>
              <p className="text-gray-700 text-sm">{sinistre.description}</p>
              <button className="text-blue-500 text-sm mt-2">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Declarer un sinistre
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Conditions generales */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">Conditions generales</h2>
          <p className="text-gray-700 text-sm mb-2">conditions generales s'appliquenet au contract signe le 15-03-2023</p>
          <a href="#" className="text-blue-500 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 011.125-1.125h1.5a5.625 5.625 0 015.625 5.625v2.625a3.375 3.375 0 01-3.375 3.375H3.75a3.375 3.375 0 01-3.375-3.375v-2.625a5.625 5.625 0 015.625-5.625h1.5a1.125 1.125 0 011.125 1.125h-1.5a3.375 3.375 0 00-3.375 3.375v2.625a3.375 3.375 0 003.375 3.375H19.5z" />
            </svg>
            Telecharger les conditions generales (PDF)
          </a>
        </div>

        {/* Documents */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Documents</h2>
          <ul>
            <li className="text-blue-500 text-sm flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 011.125-1.125h1.5a5.625 5.625 0 015.625 5.625v2.625a3.375 3.375 0 01-3.375 3.375H3.75a3.375 3.375 0 01-3.375-3.375v-2.625a5.625 5.625 0 015.625-5.625h1.5a1.125 1.125 0 011.125 1.125h-1.5a3.375 3.375 0 00-3.375 3.375v2.625a3.375 3.375 0 003.375 3.375H19.5z" />
              </svg>
              Attestation d'assurances
            </li>
            <li className="text-blue-500 text-sm flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 011.125-1.125h1.5a5.625 5.625 0 015.625 5.625v2.625a3.375 3.375 0 01-3.375 3.375H3.75a3.375 3.375 0 01-3.375-3.375v-2.625a5.625 5.625 0 015.625-5.625h1.5a1.125 1.125 0 011.125 1.125h-1.5a3.375 3.375 0 00-3.375 3.375v2.625a3.375 3.375 0 003.375 3.375H19.5z" />
              </svg>
              Contract complet
            </li>
            <li className="text-blue-500 text-sm flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 011.125-1.125h1.5a5.625 5.625 0 015.625 5.625v2.625a3.375 3.375 0 01-3.375 3.375H3.75a3.375 3.375 0 01-3.375-3.375v-2.625a5.625 5.625 0 015.625-5.625h1.5a1.125 1.125 0 011.125 1.125h-1.5a3.375 3.375 0 00-3.375 3.375v2.625a3.375 3.375 0 003.375 3.375H19.5z" />
              </svg>
              Facture derniere echeance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
