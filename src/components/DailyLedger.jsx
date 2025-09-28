import Ledger from "../pages/Ledger";

function DailyLedger({ entries, setEntries, selectedDate, setSelectedDate }) {
  // Function to generate the dates for the calendar bar
  const generateDates = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i - 3); // -3 to center the selected date
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateDates(selectedDate);

  // Filter the entries to show only those for the selected date
  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === selectedDate.getFullYear() &&
      entryDate.getMonth() === selectedDate.getMonth() &&
      entryDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="flex flex-col items-center w-full">
      {/* Date Navigation Bar */}
      <div className="bg-white shadow rounded-2xl p-4 w-full mb-6">
        <h3 className="text-xl font-semibold mb-4">
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex justify-between items-center text-center">
          {weekDates.map((date) => {
            const dayName = date.toLocaleString("default", {
              weekday: "short",
            });
            const dayOfMonth = date.getDate();
            const isSelected =
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear();

            return (
              <button
                key={date.getTime()}
                onClick={() => setSelectedDate(date)}
                className={`flex-1 p-2 mx-1 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="text-sm">{dayName}</div>
                <div className="text-xl font-bold">{dayOfMonth}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pass the filtered entries to the Ledger component */}
      <div className="flex justify-center w-full">
        <Ledger
          entries={filteredEntries}
          setEntries={setEntries}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

export default DailyLedger;
