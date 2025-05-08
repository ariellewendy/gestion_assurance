import React from "react";
import { Gift, ShieldCheck, Car, HeartPulse, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Offres() {
  const navigate = useNavigate();
  const offres = [
    {
      icon: <Car className="text-blue-500" size={32} />,
      titre: "Assurance Auto",
      description: "Roulez en toute sérénité grâce à nos formules auto flexibles, adaptées à tous vos besoins et à ceux de vos proches.",
    },
    {
      icon: <Home className="text-green-500" size={32} />,
      titre: "Assurance Habitation",
      description: "Protégez votre foyer et vos biens contre les imprévus du quotidien avec une couverture complète et fiable.",
    },
    {
      icon: <HeartPulse className="text-pink-500" size={32} />,
      titre: "Assurance Santé",
      description: "Bénéficiez d’une prise en charge santé optimale pour vous et votre famille, en toute simplicité.",
    },
    {
      icon: <ShieldCheck className="text-orange-500" size={32} />,
      titre: "Responsabilité Civile",
      description: "Couvrez-vous efficacement contre les dommages causés à autrui, dans la vie privée comme professionnelle.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Navbar semi-transparente avec logo IG */}
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
        <div className="flex items-center gap-2">
  <button
    className="flex items-center gap-1 text-blue-700 text-sm font-medium bg-transparent px-2 py-1 rounded-md transition hover:bg-blue-50 hover:text-blue-900 focus:outline-none"
    onClick={() => navigate("/Dashboard")}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m-4 0h4" /></svg>
    Mon espace
  </button>
  <button
    className="flex items-center gap-1 text-blue-700 text-sm font-medium bg-transparent px-2 py-1 rounded-md transition hover:bg-blue-50 hover:text-blue-900 focus:outline-none"
    onClick={() => navigate("/ProfilePage")}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    Profil
  </button>
</div>
      </nav>
      {/* Disposition principale */}
      <div className="pt-24 pb-12 px-4 flex flex-col md:flex-row md:items-stretch gap-8 max-w-7xl mx-auto min-h-[calc(100vh-3.5rem)]">
        {/* Colonne gauche : titre + texte + bouton */}
        <div className="md:w-1/2 flex flex-col justify-start flex-1">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Découvrez nos <span className="text-blue-600">offres d’assurance</span> pensées pour vous
            </h1>
            <p className="text-base text-gray-500 mb-6 max-w-md">
              Chez InsureGo, nous avons conçu des solutions flexibles et complètes pour protéger ce qui compte le plus à vos yeux : votre véhicule, votre logement, votre santé et votre responsabilité. <br />
              Profitez d’une couverture sur-mesure, d’un accompagnement personnalisé et d’une gestion simplifiée au quotidien.
            </p>
            <button className="w-fit px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
              Demander un devis gratuit
            </button>
          </div>
          {/* Espace flexible pour combler le vide et aligner le contenu en haut */}
          <div className="flex-1"></div>
        </div>
        {/* Colonne droite : carte offres */}
        <div className="md:w-1/2 w-full flex items-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-5 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="text-green-600" size={28} />
              <span className="text-lg font-semibold text-gray-800">Nos Offres</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {offres.map((offre, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition">
                  <div>{offre.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{offre.titre}</div>
                    <div className="text-gray-500 text-sm">{offre.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}