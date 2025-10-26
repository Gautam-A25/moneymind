import React from "react";
import { CATEGORY_COLOR_MAP } from "../constants";
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
import { Doughnut, Pie } from "react-chartjs-2";
import TrendChart from "../components/TrendChart"; // Import the new reusable chart

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

  // --- Data Processing for Category Pie Chart ---
  const expenses = entries.filter((e) => e.amount < 0);

  const spendingByCategory = expenses.reduce((acc, entry) => {
    const category = entry.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + Math.abs(entry.amount);
    return acc;
  }, {});

  const categoryLabels = Object.keys(spendingByCategory);
  const categoryData = Object.values(spendingByCategory);

  const categoryColors = categoryLabels.map(
    (label) => CATEGORY_COLOR_MAP[label] || "rgba(107, 114, 128, 0.8)"
  ); // Default gray color

  const categoryPieData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: categoryColors.slice(0, categoryLabels.length),
        hoverBackgroundColor: categoryColors.slice(0, categoryLabels.length),
      },
    ],
  };

  // --- Key Metrics Calculation ---
  const avgDailyExpense = totalExpense > 0 ? (totalExpense / 30).toFixed(2) : 0;

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

        {/* Trend Chart Card (Replaces old Bar Chart) */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-2">
          {entries.length > 0 ? (
            <div className="w-full h-64 mx-auto">
              <TrendChart entries={entries} />{" "}
              {/* We pass no size prop, so it defaults to "large" */}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No data to display.
            </p>
          )}
        </div>

        {/* Spending by Category Pie Chart */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Spending by Category
          </h2>
          {expenses.length > 0 ? (
            <div className="w-full h-80 mx-auto flex justify-center">
              <Pie
                data={categoryPieData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No expense data to display.
            </p>
          )}
        </div>

        {/* Key Metrics Card */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="space-y-4 text-center">
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
