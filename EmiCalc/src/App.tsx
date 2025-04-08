import { useEffect, useState } from "react";

function App() {
  const [principle, setPrinciple] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;

    if (id === "principle") {
      setPrinciple(value);
    } else if (id === "interest") {
      setInterest(value);
    } else if (id === "time") {
      setTime(value);
    }
  };

  const calculateEmi = () => {
    const r = interest / 12 / 100;
    const calcPow = Math.pow(1 + r, time * 12);
    const Amount = principle * ((r * calcPow) / (calcPow - 1));
    setEmi(Math.round(Amount));
  };

  useEffect(() => {
    if (interest && principle && time) {
      calculateEmi();
    }
  }, [principle, interest, time]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm w-full border border-gray-300">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">📊 EMI Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
            <input
              type="number"
              value={principle}
              id="principle"
              onChange={handleInput}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Loan Amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
            <input
              type="number"
              value={interest}
              id="interest"
              onChange={handleInput}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Interest Rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tenure (in years)</label>
            <input
              type="number"
              value={time}
              id="time"
              onChange={handleInput}
              className="mt-1 block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Tenure"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md text-center border border-gray-200">
          <h2 className="text-xl font-bold text-gray-700">EMI: ₹{emi}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
