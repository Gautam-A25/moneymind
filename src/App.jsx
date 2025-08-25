import { useState } from "react";
import Dashboard from "./Dashboard";
import DailyLedger from "./DailyLedger";
import Insights from "./Insights";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold">MoneyMind</h1>
        <div className="flex gap-4">
          <button
            className={`px-3 py-1 rounded ${
              activePage === "dashboard" ? "bg-blue-800" : "bg-blue-500"
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-3 py-1 rounded ${
              activePage === "ledger" ? "bg-blue-800" : "bg-blue-500"
            }`}
            onClick={() => setActivePage("ledger")}
          >
            Daily Ledger
          </button>
          <button
            className={`px-3 py-1 rounded ${
              activePage === "insights" ? "bg-blue-800" : "bg-blue-500"
            }`}
            onClick={() => setActivePage("insights")}
          >
            Insights
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "ledger" && <DailyLedger />}
        {activePage === "insights" && <Insights />}
      </main>
    </div>
  );
}

export default App;
