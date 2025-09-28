import React, { useState } from "react";

export default function AddTransactionForm({
  selectedDate,
  entries,
  setEntries,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return; // Basic validation
    const newEntry = {
      id: Date.now(),
      label: title,
      amount:
        type === "expense"
          ? -Math.abs(parseFloat(amount))
          : Math.abs(parseFloat(amount)),
      date: selectedDate.toISOString(), // Store as ISO string for consistency
    };
    setEntries([...entries, newEntry]);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Added a click handler to prevent closing when clicking inside the form
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">
          Date:{" "}
          {selectedDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Form Fields */}
      <label className="block mb-2 text-sm font-medium text-gray-600">
        Transaction title
      </label>
      <input
        className="w-full p-2.5 mb-4 bg-gray-100 rounded-lg border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Coffee"
        required
      />

      <label className="block mb-2 text-sm font-medium text-gray-600">
        Transaction amount
      </label>
      <input
        type="number"
        step="0.01"
        className="w-full p-2.5 mb-6 bg-gray-100 rounded-lg border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., 150.00"
        required
      />

      {/* Type Selector */}
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setType("income")}
        >
          Income
        </button>
        <button
          type="button"
          className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
      >
        + Add
      </button>
    </form>
  );
}
