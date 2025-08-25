function Insights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spending Categories */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
        <div className="h-40 flex items-center justify-center text-gray-400">
          🥧 Pie Chart placeholder
        </div>
      </div>

      {/* Savings Goals */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Savings Goals</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>New Laptop</span>
            <span className="text-green-600">60% complete</span>
          </li>
          <li className="flex justify-between">
            <span>Emergency Fund</span>
            <span className="text-green-600">30% complete</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Insights;
