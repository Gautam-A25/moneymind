import React, { useState } from "react";
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
import TrendChart from "../components/TrendChart";
import { CATEGORY_COLOR_MAP } from "../constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  // 1. State for the currently selected month in Insights view
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // 2. Filter entries to only include the selected MONTH
  const monthlyEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getMonth() === currentDate.getMonth() &&
      entryDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // --- Data Processing (Uses filtered 'monthlyEntries' now!) ---
  const totalIncome = monthlyEntries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = monthlyEntries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const doughnutData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Total",
        data: [totalIncome, totalExpense],
        backgroundColor: ["rgba(22, 163, 74, 0.8)", "rgba(220, 38, 38, 0.8)"],
        borderColor: ["rgba(22, 163, 74, 1)", "rgba(220, 38, 38, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // --- Category Pie Chart ---
  const expenses = monthlyEntries.filter((e) => e.amount < 0);
  const spendingByCategory = expenses.reduce((acc, entry) => {
    const category = entry.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + Math.abs(entry.amount);
    return acc;
  }, {});

  const categoryLabels = Object.keys(spendingByCategory);
  const categoryData = Object.values(spendingByCategory);

  const dynamicColors = categoryLabels.map(
    (label) => CATEGORY_COLOR_MAP[label] || "#A1A1AA"
  );

  const categoryPieData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: dynamicColors,
        hoverBackgroundColor: dynamicColors,
      },
    ],
  };

  // --- Key Metrics ---
  const netBalance = totalIncome - totalExpense;
  // A simple average based on days passed in month so far (or 30 if past)
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const dayOfMonth =
    currentDate.getMonth() === new Date().getMonth()
      ? new Date().getDate()
      : daysInMonth;
  const avgDailyExpense =
    totalExpense > 0 ? (totalExpense / dayOfMonth).toFixed(2) : 0;

  return (
    <div>
      {/* Header with Date Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Insights</h1>

        <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm mt-4 md:mt-0">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-medium min-w-[150px] text-center">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Income vs. Expense
          </h2>
          {monthlyEntries.length > 0 ? (
            <div className="w-full h-64 mx-auto">
              <Doughnut
                data={doughnutData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No data for this month.
            </p>
          )}
        </div>

        {/* Trend Chart (Now receives 'currentDate'!) */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-2">
          {monthlyEntries.length > 0 ? (
            <div className="w-full h-64 mx-auto">
              <TrendChart entries={entries} selectedDate={currentDate} />
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              No data for this month.
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
              No expense data for this month.
            </p>
          )}
        </div>

        {/* Key Metrics Card */}
        <div className="bg-white shadow rounded-2xl p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Monthly Metrics</h2>
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
                ₹{netBalance.toFixed(2)}
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
