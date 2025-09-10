import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Plus } from "lucide-react";

export default function Dashboard({
  balance,
  income,
  expense,
  entries,
  setActivePage,
  selectedDate,
  setSelectedDate,
}) {
  const recentExpenses = entries.filter((entry) => entry.amount < 0).slice(-5);

  return (
    <div className="w-full scale-[0.9] origin-top h-100">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards (Placeholder based on wireframe and props) */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-bold">Balance</h3>
          <p className="text-2xl font-medium text-gray-700">
            ₹{balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-bold">Total Income</h3>
          <p className="text-2xl font-medium text-green-600">
            ₹{income.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-bold">Total Expenses</h3>
          <p className="text-2xl font-medium text-red-600">
            ₹{expense.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Daily Ledger Block */}
        <section
          onClick={() => setActivePage("ledger")}
          className="bg-white shadow rounded-2xl p-6 col-span-1 lg:col-span-2 relative cursor-pointer overflow-hidden"
        >
          <h3 className="text-xl font-semibold mb-2">
            Daily Ledger For{" "}
            {selectedDate.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>
          <ul className="space-y-2 mb-4">
            {recentExpenses.length > 0 ? (
              recentExpenses.map((entry) => (
                <li
                  key={entry.id}
                  className="flex justify-between items-center p-2 rounded-lg bg-red-100"
                >
                  <span>{entry.label}</span>
                  <span className="font-semibold text-red-600">
                    ₹{Math.abs(entry.amount)}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No expenses today. Add one now!</p>
            )}
          </ul>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </section>

        {/* Calendar Block */}
        <section className="bg-white shadow rounded-2xl p-6 col-span-1">
          <h3 className="text-xl font-semibold mb-2">Calendar</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-md border"
          />
          <p className="text-gray-600 text-sm mt-2">
            Selected date:{" "}
            <span className="font-medium">{selectedDate.toDateString()}</span>
          </p>
        </section>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Insights Block */}
        <section className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-2">Insights</h3>
          <p className="text-gray-500">Charts & analytics go here</p>
        </section>

        {/* Quick Actions Block */}
        <section className="bg-white shadow rounded-2xl p-6 flex flex-col items-start">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
            <Plus size={20} /> Add Expense
          </button>
        </section>
      </div>
    </div>
  );
}
