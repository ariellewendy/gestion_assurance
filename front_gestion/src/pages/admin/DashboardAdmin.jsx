import React from 'react';








export default function DashboardAdmin() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 flex flex-col p-4">
        <div className="text-2xl font-bold text-purple-400 mb-8">Cofeed</div>

        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="text-white font-semibold">Home</li>
            <li>Messages</li>
            <li>Profile</li>
            <li>Saved Bills</li>
            <li>Settings</li>
          </ul>
        </nav>

        <div className="mt-auto">
          <div className="text-sm">Account</div>
          <div className="font-bold">Michael</div>
          <div className="text-xs text-gray-400">@michaelso...</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-700 p-2 rounded-full">
              {/* Notification Icon */}
              <span className="text-white">🔔</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2">123****23</div>
              <div className="font-bold">$3,456.70</div>
            </div>
          </div>
        </div>

        {/* Due Bills */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {["Electricity", "Gas", "Water", "Fuel"].map((item, idx) => (
            <div key={idx} className="bg-gray-800 p-6 rounded-2xl">
              <div className="text-2xl font-bold mb-2">${[100, 124, 206, 120][idx]}</div>
              <div className="text-sm text-gray-400">Last Month</div>
              <div className="mt-2 font-semibold">{item}</div>
            </div>
          ))}
        </div>

        {/* Energy Consumption + Quick Payment */}
        <div className="grid grid-cols-3 gap-6">
          {/* Energy Consumption */}
          <div className="col-span-2 bg-gray-800 p-6 rounded-2xl">
            <div className="flex justify-between mb-4">
              <div className="font-bold">Energy Consumption</div>
              <div className="text-sm text-gray-400">December, 2020</div>
            </div>
            {/* Fake Bar Chart */}
            <div className="flex items-end space-x-2 h-48">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month, idx) => (
                <div key={month} className="flex flex-col items-center">
                  <div className="bg-blue-500 w-4" style={{ height: `${(idx + 1) * 10}px` }}></div>
                  <div className="text-xs mt-1">{month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Payment */}
          <div className="bg-gray-800 p-6 rounded-2xl">
            <div className="font-bold mb-4">Quick Payment</div>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-700 p-3 rounded-lg">Debit Card</div>
              <div className="bg-gray-700 p-3 rounded-lg">Paypal</div>
            </div>
            <div className="text-sm text-gray-400 mb-2">Details</div>
            <div className="text-2xl font-bold mb-2">$2,000</div>
            <div className="text-sm text-gray-400 mb-6">Electricity</div>
            <button className="bg-purple-500 w-full py-2 rounded-xl text-white font-bold">
              Continue for payment
            </button>
          </div>
        </div>

        {/* Bottom - Performance */}
        <div className="mt-8 bg-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between mb-4">
            <div className="font-bold">Performance</div>
            <div className="text-sm text-gray-400">Overview / FAQ / Announcements</div>
          </div>
          {/* Stars and bars */}
          <div className="space-y-4">
            {[4.4, 2.4, 1.2, 0.7].map((rate, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="w-2/3 bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${rate * 20}%` }}></div>
                </div>
                <div className="text-sm">{rate} ★</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
