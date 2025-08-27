import { useState } from "react";
import Dashboard from "./Dashboard";
import Insights from "./Insights";
import DailyLedger from "./DailyLedger";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // central entries state
  const [entries, setEntries] = useState([
    { id: 1, label: "Breakfast", amount: -120 },
    { id: 2, label: "Lunch", amount: -200 },
    { id: 3, label: "Freelance Payment", amount: 2500 },
  ]);

  // derived values
  const totalIncome = entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold tracking-wide">💰 MoneyMind</h1>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded-lg transition ${
              activePage === "dashboard"
                ? "bg-blue-800 shadow"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition ${
              activePage === "insights"
                ? "bg-blue-800 shadow"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => setActivePage("insights")}
          >
            Insights
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition ${
              activePage === "ledger"
                ? "bg-blue-800 shadow"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => setActivePage("ledger")}
          >
            Daily Ledger
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-4xl">
          {activePage === "dashboard" && (
            <Dashboard
              balance={balance}
              income={totalIncome}
              expense={totalExpense}
            />
          )}
          {activePage === "insights" && <Insights />}
          {activePage === "ledger" && (
            <DailyLedger entries={entries} setEntries={setEntries} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
