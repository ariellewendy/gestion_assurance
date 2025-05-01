const StatCard = ({ title, value, icon, bgColor }) => (
    // <div className={`bg-white/70 border rounded-xl shadow-sm p-5 flex items-center mb-6`}>
    <div className={`bg-white/70 rounded-xl shadow-lg p-5 flex items-center mb-6`}>

      <div className={`h-12 w-12 bg-${bgColor} rounded-lg flex items-center justify-center text-${bgColor.replace('-100', '-600')}`}>
        {icon}
      </div>
      <div className="ml-4">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold text-gray-800">{value}</div>
      </div>
    </div>
  );
  
  export default StatCard;
  