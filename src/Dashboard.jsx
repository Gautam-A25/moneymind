import React from "react";
import { Plus } from "lucide-react";

export default function Dashboard({ balance, income, expense }) {
  return (
    <div className="w-full">
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
        <section className="bg-white shadow rounded-2xl p-6 col-span-1 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-2">Daily Ledger</h3>
          <p className="text-gray-500">Ledger entries go here</p>
        </section>

        {/* Calendar Block */}
        <section className="bg-white shadow rounded-2xl p-6 col-span-1">
          <h3 className="text-xl font-semibold mb-2">Calendar</h3>
          <p className="text-gray-500">Calendar widget goes here</p>
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
