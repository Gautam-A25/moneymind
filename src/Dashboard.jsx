function Dashboard({ balance, income, expense }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <p className="text-gray-600">
        Quick glance at your balances, expenses, and incomes.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-green-100 text-green-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{balance}</h3>
          <p>Balance</p>
        </div>
        <div className="bg-red-100 text-red-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{expense}</h3>
          <p>Expenses</p>
        </div>
        <div className="bg-blue-100 text-blue-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{income}</h3>
          <p>Income</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
