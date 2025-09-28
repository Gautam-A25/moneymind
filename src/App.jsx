import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import DailyLedger from "./components/DailyLedger";
import { Home, BarChart2, Book, Settings, Menu } from "lucide-react";
import Ichigo from "./assets/Ichigo.jpeg";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const totalIncome = entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = entries
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md hidden sm:block">
        <h1 className="text-xl font-bold mb-6">MoneyMind</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActivePage("dashboard")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activePage === "dashboard"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home size={20} /> Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("insights")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activePage === "insights"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <BarChart2 size={20} /> Insights
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("ledger")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activePage === "ledger"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Book size={20} /> Ledger
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("settings")}
                className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activePage === "settings"
                    ? "bg-gray-200 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Settings size={20} /> Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header/Navbar */}
        <header className="bg-white p-4 shadow-sm flex items-center justify-between">
          <button className="sm:hidden text-gray-600">
            <Menu size={24} />
          </button>
          <div className="flex-1 flex justify-center sm:justify-end">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Hello, Aayush</span>
              <img
                src={Ichigo}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activePage === "dashboard" && (
            <Dashboard
              balance={balance}
              income={totalIncome}
              expense={totalExpense}
              entries={entries}
              setActivePage={setActivePage}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {activePage === "insights" && <Insights />}
          {activePage === "ledger" && (
            <DailyLedger
              entries={entries}
              setEntries={setEntries}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {activePage === "settings" && (
            <div className="text-center p-12">
              <h2 className="text-2xl font-semibold">Settings Page</h2>
              <p className="text-gray-500 mt-2">
                User settings and account details go here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
