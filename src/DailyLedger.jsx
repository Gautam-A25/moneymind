import Ledger from "./Ledger";

function DailyLedger({ entries, setEntries }) {
  return (
    <div className="flex justify-center">
      <Ledger entries={entries} setEntries={setEntries} />
    </div>
  );
}

export default DailyLedger;
