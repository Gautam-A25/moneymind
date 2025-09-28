import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

// Register the components from Chart.js that we'll be using
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Insights({ entries }) {
  // --- Data Processing for Doughnut Chart ---
  const totalIncome = entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const doughnutData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Total",
        data: [totalIncome, totalExpense],
        backgroundColor: [
          "rgba(22, 163, 74, 0.8)", // Green for Income
          "rgba(220, 38, 38, 0.8)", // Red for Expenses
        ],
        borderColor: ["rgba(22, 163, 74, 1)", "rgba(220, 38, 38, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // --- Data Processing for Weekly Bar Chart ---
  const labels = [];
  const incomeByDay = {};
  const expenseByDay = {};

  // Initialize the last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
    labels.push(dayLabel);
    incomeByDay[dayLabel] = 0;
    expenseByDay[dayLabel] = 0;
  }

  // Aggregate data for the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  entries.forEach((entry) => {
    const entryDate = new Date(entry.date);
    if (entryDate >= sevenDaysAgo) {
      const dayLabel = entryDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (entry.amount > 0) {
        incomeByDay[dayLabel] += entry.amount;
      } else {
        expenseByDay[dayLabel] += Math.abs(entry.amount);
      }
    }
  });

  const barData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: labels.map((label) => incomeByDay[label]),
        backgroundColor: "rgba(22, 163, 74, 0.7)",
      },
      {
        label: "Expense",
        data: labels.map((label) => expenseByDay[label]),
        backgroundColor: "rgba(220, 38, 38, 0.7)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Income & Expense - Last 7 Days" },
    },
  };

  // --- Key Metrics Calculation ---
  const avgDailyExpense = totalExpense > 0 ? (totalExpense / 30).toFixed(2) : 0; // Assuming a 30-day month for average

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Insights</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart Card */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Income vs. Expense
          </h2>
          {entries.length > 0 ? (
            <div className="w-full h-64 mx-auto">
              <Doughnut
                data={doughnutData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No data to display.
            </p>
          )}
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Weekly Breakdown
          </h2>
          {entries.length > 0 ? (
            <div className="w-full h-64 mx-auto">
              <Bar options={barOptions} data={barData} />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No data to display.
            </p>
          )}
        </div>

        {/* Key Metrics Card */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800 font-medium">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800 font-medium">
                Total Expenses
              </p>
              <p className="text-2xl font-bold text-red-600">
                ₹{totalExpense.toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800 font-medium">Net Balance</p>
              <p className="text-2xl font-bold text-blue-900">
                ₹{(totalIncome - totalExpense).toFixed(2)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-blue-800 font-medium">
                Avg. Daily Expense
              </p>
              <p className="text-2xl font-bold text-blue-900">
                ₹{avgDailyExpense}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
