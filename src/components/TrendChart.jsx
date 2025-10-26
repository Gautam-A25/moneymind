import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Processes entries for the bar chart based on the selected time range.
 */
function processChartData(entries, timeRange) {
  const labels = [];
  const incomeByPeriod = {};
  const expenseByPeriod = {};
  const now = new Date();

  let startDate;

  if (timeRange === "week") {
    // --- WEEKLY LOGIC (Last 7 Days) ---
    startDate = new Date();
    startDate.setDate(now.getDate() - 6); // 6 days ago + today = 7 days
    startDate.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const label = d.toLocaleDateString("en-US", { weekday: "short" });

      if (!labels.includes(label)) {
        // Avoid duplicate labels if week spans month end
        labels.push(label);
      }
      incomeByPeriod[label] = 0;
      expenseByPeriod[label] = 0;
    }
  } else {
    // --- MONTHLY LOGIC (Current Calendar Month) ---
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    startDate = new Date(year, month, 1); // 1st day of the current month
    startDate.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const label = String(day); // Use day number as label
      labels.push(label);
      incomeByPeriod[label] = 0;
      expenseByPeriod[label] = 0;
    }
  }

  // 3. Aggregate data from entries
  entries.forEach((entry) => {
    const entryDate = new Date(entry.date);

    // Only process entries within the calculated date range
    if (entryDate >= startDate) {
      let label;

      if (timeRange === "week") {
        label = entryDate.toLocaleDateString("en-US", { weekday: "short" });
      } else {
        // Only include entries from the current month
        if (entryDate.getMonth() === now.getMonth()) {
          label = String(entryDate.getDate());
        }
      }

      // FIX: Use (label in object) to check for property. This fixes the ESLint error.
      if (label in incomeByPeriod) {
        if (entry.amount > 0) {
          incomeByPeriod[label] += entry.amount;
        } else {
          expenseByPeriod[label] += Math.abs(entry.amount);
        }
      }
    }
  });

  return {
    labels,
    incomeData: labels.map((label) => incomeByPeriod[label]),
    expenseData: labels.map((label) => expenseByPeriod[label]),
  };
}

export default function TrendChart({ entries, size = "large" }) {
  const [timeRange, setTimeRange] = useState("week"); // 'week' or 'month'

  const { labels, incomeData, expenseData } = processChartData(
    entries,
    timeRange
  );

  const barData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(22, 163, 74, 0.7)",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(220, 38, 38, 0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: size !== "small",
      },
      title: {
        display: size !== "small",
        text:
          timeRange === "week"
            ? "Income & Expense - Last 7 Days"
            : `Income & Expense - ${new Date().toLocaleString("en-US", {
                month: "long",
              })}`,
      },
    },
    scales: {
      y: {
        ticks: {
          maxTicksLimit: size === "small" ? 5 : undefined,
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-1 mb-2">
        <button
          onClick={() => setTimeRange("week")}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            timeRange === "week"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeRange("month")}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            timeRange === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Chart */}
      <div className="relative flex-grow">
        <Bar options={chartOptions} data={barData} />
      </div>
    </div>
  );
}
