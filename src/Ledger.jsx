import { useState } from "react";
import { Pencil, Save, Trash2, Plus } from "lucide-react";

function Ledger({ entries, setEntries }) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [transactionType, setTransactionType] = useState("income");

  // Add new entry
  const addEntry = () => {
    if (!label || !amount) return;
    const finalAmount =
      transactionType === "expense" ? -parseFloat(amount) : parseFloat(amount);
    const newEntry = {
      id: Date.now(),
      label,
      amount: finalAmount,
    };
    setEntries([...entries, newEntry]);
    setLabel("");
    setAmount("");
  };

  // Start editing
  const startEditing = (entry) => {
    setEditingId(entry.id);
    setLabel(entry.label);
    setAmount(entry.amount);
  };

  // Save edit
  const saveEdit = () => {
    setEntries(
      entries.map((e) =>
        e.id === editingId ? { ...e, label, amount: parseFloat(amount) } : e
      )
    );
    setEditingId(null);
    setLabel("");
    setAmount("");
  };

  // Delete entry
  const deleteEntry = () => {
    setEntries(entries.filter((e) => e.id !== editingId));
    setEditingId(null);
    setLabel("");
    setAmount("");
  };

  // Derived values
  const totalIncome = entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="bg-white shadow rounded-2xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Daily Ledger</h2>

      {/* Input Fields (only visible when not editing) */}
      {!editingId && (
        <div className="flex gap-2 mb-4 items-center">
          {/* Input fields */}
          <input
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border p-2 rounded-lg w-1/2"
          />
          <div className="flex items-center border rounded-lg overflow-hidden w-1/4">
            {/* Toggle buttons */}
            <button
              onClick={() => setTransactionType("income")}
              className={`w-1/2 p-2 font-semibold transition-colors duration-200 ${
                transactionType === "income"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setTransactionType("expense")}
              className={`w-1/2 p-2 font-semibold transition-colors duration-200 ${
                transactionType === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Expense
            </button>
          </div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded-lg w-1/4"
          />
          {/* Add button */}
          <button
            onClick={addEntry}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
          {/* Edit/Done button */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="ml-1 px-3 py-2 w-20 rounded-lg bg-blue-500 text-white text-center"
          >
            {isEditMode ? "Done" : "Edit"}
          </button>
        </div>
      )}

      {/* Transactions List */}
      <ul className="space-y-2 mb-4">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={`flex h-14 justify-between items-center p-2 rounded-lg ${
              entry.amount > 0 ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {editingId === entry.id ? (
              // Edit Mode
              <div className="flex gap-2 w-full items-center">
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="border p-2 rounded-lg w-1/2"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 rounded-lg w-1/3"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={deleteEntry}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ) : (
              // Normal Mode
              <>
                <span>
                  {entry.label} — ₹{entry.amount}
                </span>
                {isEditMode && (
                  <button
                    onClick={() => startEditing(entry)}
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-100 text-green-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{balance}</h3>
          <p>Balance</p>
        </div>
        <div className="bg-red-100 text-red-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{totalExpense}</h3>
          <p>Expenses</p>
        </div>
        <div className="bg-blue-100 text-blue-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{totalIncome}</h3>
          <p>Income</p>
        </div>
      </div>
    </div>
  );
}

export default Ledger;
