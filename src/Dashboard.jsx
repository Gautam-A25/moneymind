function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Balance */}
      <div className="bg-white shadow rounded-2xl p-6 col-span-1">
        <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
        <p className="text-3xl font-bold text-green-600">₹12,450</p>
      </div>

      {/* Weekly Expenses */}
      <div className="bg-white shadow rounded-2xl p-6 col-span-2">
        <h2 className="text-lg font-semibold mb-4">Weekly Expenses</h2>
        <div className="h-40 flex items-center justify-center text-gray-400">
          📊 Chart placeholder
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-2xl p-6 col-span-3">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Groceries</span>
            <span className="text-red-500">- ₹1,200</span>
          </li>
          <li className="flex justify-between">
            <span>Coffee</span>
            <span className="text-red-500">- ₹150</span>
          </li>
          <li className="flex justify-between">
            <span>Freelance Work</span>
            <span className="text-green-500">+ ₹3,000</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
