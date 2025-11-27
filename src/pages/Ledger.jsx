import { useState, useEffect, useMemo } from "react";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../constants";
import { Pencil, Save, Trash2, Plus } from "lucide-react";

function Ledger({ entries, setEntries, selectedDate }) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [editingId, setEditingId] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");

  const incomeCategoryNames = useMemo(
    () => INCOME_CATEGORIES.map((c) => c.name),
    []
  );
  const expenseCategoryNames = useMemo(
    () => EXPENSE_CATEGORIES.map((c) => c.name),
    []
  );

  useEffect(() => {
    if (transactionType === "income") {
      if (!incomeCategoryNames.includes(category)) {
        setCategory(incomeCategoryNames[0] || "");
      }
    } else {
      if (!expenseCategoryNames.includes(category)) {
        setCategory(
          expenseCategoryNames.find((c) => c === "Other") ||
            expenseCategoryNames[0] ||
            ""
        );
      }
    }
  }, [transactionType, category, incomeCategoryNames, expenseCategoryNames]);

  const categories =
    transactionType === "income" ? incomeCategoryNames : expenseCategoryNames;

  const addEntry = () => {
    if (!label || !amount) return;
    const finalAmount =
      transactionType === "expense" ? -parseFloat(amount) : parseFloat(amount);
    const newEntry = {
      id: Date.now(),
      label,
      amount: finalAmount,
      date: selectedDate.toISOString(),
      category: category,
    };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setLabel("");
    setAmount("");
    setCategory("Other");
  };

  const startEditing = (entry) => {
    setEditingId(entry.id);
    setLabel(entry.label);
    setAmount(Math.abs(entry.amount)); // Edit with a positive number
    const type = entry.amount < 0 ? "expense" : "income";
    setTransactionType(type);
    setCategory(entry.category || "Other");
  };

  const saveEdit = () => {
    setEntries((prevEntries) =>
      prevEntries.map((e) => {
        if (e.id === editingId) {
          const originalSign = e.amount < 0 ? -1 : 1;
          return {
            ...e,
            label,
            amount: parseFloat(amount) * originalSign,
            category: category,
          };
        }
        return e;
      })
    );
    setEditingId(null);
    setLabel("");
    setAmount("");
    setCategory("Other");
  };

  const deleteEntry = (entryId) => {
    setEntries((prevEntries) => prevEntries.filter((e) => e.id !== entryId));
  };

  const totalIncome = entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="bg-white shadow rounded-2xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">
        Daily Ledger For{" "}
        {selectedDate.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h2>

      {/* Input Fields */}
      {!editingId && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4 items-center">
          <input
            type="text"
            placeholder="Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border p-2 rounded-lg md:col-span-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={() => setTransactionType("income")}
              className={`px-3 py-2 font-semibold transition-colors duration-200 flex-grow text-center ${
                // <-- FIX: Added flex-grow & text-center
                transactionType === "income"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setTransactionType("expense")}
              className={`px-3 py-2 font-semibold transition-colors duration-200 flex-grow text-center ${
                // <-- FIX: Added flex-grow & text-center
                transactionType === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Expense
            </button>
          </div>
          <button
            onClick={addEntry}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      )}

      {/* Transactions List */}
      <ul className="space-y-2 mb-4">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={`flex h-16 justify-between items-center p-3 rounded-lg ${
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
                  className="border p-2 rounded-lg w-2/5"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2 rounded-lg w-1/5"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 rounded-lg w-1/5"
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                >
                  X
                </button>
              </div>
            ) : (
              // Normal Mode
              <div className="flex justify-between items-center w-full">
                <div>
                  <span className="font-medium">{entry.label}</span>
                  <span className="text-xs text-gray-500 ml-2 bg-gray-200 px-2 py-1 rounded-full">
                    {entry.category || "Uncategorized"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-semibold ${
                      entry.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {entry.amount < 0
                      ? `-₹${Math.abs(entry.amount).toFixed(2)}`
                      : `+₹${entry.amount.toFixed(2)}`}
                  </span>
                  <button
                    onClick={() => startEditing(entry)}
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-100 text-green-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{totalIncome.toFixed(2)}</h3>
          <p>Income</p>
        </div>
        <div className="bg-red-100 text-red-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{totalExpense.toFixed(2)}</h3>
          <p>Expenses</p>
        </div>
        <div className="bg-blue-100 text-blue-700 rounded-xl p-4 text-center">
          <h3 className="text-lg font-bold">₹{balance.toFixed(2)}</h3>
          <p>Balance</p>
        </div>
      </div>
    </div>
  );
}

export default Ledger;
