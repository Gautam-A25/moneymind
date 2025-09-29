import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AddTransactionForm({
  selectedDate,
  entries,
  setEntries,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [transactionDate, setTransactionDate] = useState(selectedDate);
  const [category, setCategory] = useState("Other");

  const categories = [
    "Food & Drink",
    "Shopping",
    "Transport",
    "Bills & Utilities",
    "Entertainment",
    "Salary",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    const newEntry = {
      id: Date.now(),
      label: title,
      amount:
        type === "expense"
          ? -Math.abs(parseFloat(amount))
          : Math.abs(parseFloat(amount)),
      date: transactionDate.toISOString(),
      category: category,
    };
    setEntries([...entries, newEntry]);
    onClose();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en-GB", { month: "long" })
  );
  const daysInMonth = new Date(
    transactionDate.getFullYear(),
    transactionDate.getMonth() + 1,
    0
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateChange = (part, value) => {
    const newDate = new Date(transactionDate);
    if (part === "day") newDate.setDate(value);
    if (part === "month") newDate.setMonth(value);
    if (part === "year") newDate.setFullYear(value);

    if (newDate.getDate() !== transactionDate.getDate() && part !== "day") {
      newDate.setDate(
        Math.min(
          transactionDate.getDate(),
          new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
        )
      );
    }

    setTransactionDate(newDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Add Transaction</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Date Selector Dropdowns */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Date
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* Day */}
          <div className="relative">
            <select
              value={transactionDate.getDate()}
              onChange={(e) =>
                handleDateChange("day", parseInt(e.target.value))
              }
              className="w-full p-2.5 bg-gray-100 rounded-lg appearance-none border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          {/* Month */}
          <div className="relative">
            <select
              value={transactionDate.getMonth()}
              onChange={(e) =>
                handleDateChange("month", parseInt(e.target.value))
              }
              className="w-full p-2.5 bg-gray-100 rounded-lg appearance-none border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          {/* Year */}
          <div className="relative">
            <select
              value={transactionDate.getFullYear()}
              onChange={(e) =>
                handleDateChange("year", parseInt(e.target.value))
              }
              className="w-full p-2.5 bg-gray-100 rounded-lg appearance-none border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
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
        className="w-full p-2.5 mb-4 bg-gray-100 rounded-lg border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., 150.00"
        required
      />

      <label className="block mb-2 text-sm font-medium text-gray-600">
        Category
      </label>
      <div className="relative mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2.5 bg-gray-100 rounded-lg appearance-none border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>

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
