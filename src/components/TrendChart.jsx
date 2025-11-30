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

function processChartData(entries, timeRange, referenceDate) {
  const labels = [];
  const incomeByPeriod = {};
  const expenseByPeriod = {};

  // Ensure we have a valid date object
  const anchor = referenceDate ? new Date(referenceDate) : new Date();

  let startDate;
  let endDate;

  if (timeRange === "week") {
    // --- WEEKLY LOGIC ---
    // Calculate start of the week (say, 6 days ago from the anchor)
    startDate = new Date(anchor);
    startDate.setDate(anchor.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(anchor);
    endDate.setHours(23, 59, 59, 999);

    for (let i = 6; i >= 0; i--) {
      const d = new Date(anchor);
      d.setDate(anchor.getDate() - i);
      const label = d.toLocaleDateString("en-US", { weekday: "short" });

      if (!labels.includes(label)) {
        labels.push(label);
      }
      incomeByPeriod[label] = 0;
      expenseByPeriod[label] = 0;
    }
  } else {
    // --- MONTHLY LOGIC ---
    // Show the whole month of the anchor date
    const year = anchor.getFullYear();
    const month = anchor.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    startDate = new Date(year, month, 1);
    startDate.setHours(0, 0, 0, 0);

    endDate = new Date(year, month, daysInMonth);
    endDate.setHours(23, 59, 59, 999);

    for (let day = 1; day <= daysInMonth; day++) {
      const label = String(day);
      labels.push(label);
      incomeByPeriod[label] = 0;
      expenseByPeriod[label] = 0;
    }
  }

  // Aggregate data
  entries.forEach((entry) => {
    const entryDate = new Date(entry.date);

    // Check if entry falls within our calculated range
    if (entryDate >= startDate && entryDate <= endDate) {
      let label;

      if (timeRange === "week") {
        label = entryDate.toLocaleDateString("en-US", { weekday: "short" });
      } else {
        label = String(entryDate.getDate());
      }

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
    periodLabel:
      timeRange === "week"
        ? `Week ending ${anchor.toLocaleDateString()}`
        : anchor.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
}

export default function TrendChart({ entries, selectedDate, size = "large" }) {
  const [timeRange, setTimeRange] = useState("week");

  // Recalculate whenever entries, timeRange, or the selectedDate changes
  const { labels, incomeData, expenseData, periodLabel } = processChartData(
    entries,
    timeRange,
    selectedDate
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
        text: `Income & Expense - ${periodLabel}`,
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

      <div className="relative flex-grow">
        <Bar options={chartOptions} data={barData} />
      </div>
    </div>
  );
}
