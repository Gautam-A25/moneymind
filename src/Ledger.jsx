function Ledger() {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Daily Ledger</h2>

      {/* Date selector */}
      <div className="mb-4">
        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Ledger entries */}
      <ul className="space-y-2">
        <li className="flex justify-between border-b py-2">
          <span>Breakfast</span>
          <span className="text-red-500">- ₹120</span>
        </li>
        <li className="flex justify-between border-b py-2">
          <span>Lunch</span>
          <span className="text-red-500">- ₹200</span>
        </li>
        <li className="flex justify-between border-b py-2">
          <span>Freelance Payment</span>
          <span className="text-green-500">+ ₹2,500</span>
        </li>
      </ul>

      {/* Add entry */}
      <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        ➕ Add Entry
      </button>
    </div>
  );
}

export default Ledger;
