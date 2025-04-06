import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds < 0) {
      alert("Invalid Input");
      return;
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else if (id === "seconds") {
      setSeconds(value);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) return prevSeconds - 1;
          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              setSeconds(59);
              return prevMinutes - 1;
            }
            setHours((prevHours) => {
              if (prevHours > 0) {
                setMinutes(59);
                setSeconds(59);
                return prevHours - 1;
              }
              handleReset();
              alert("Timer is finished");
              return 0;
            });
            return 0;
          });
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, hours, minutes, seconds]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-center text-3xl font-semibold text-gray-700 mb-4">Countdown Timer</h1>

        {!isRunning ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <input
                id="hours"
                placeholder="HH"
                onChange={handleInput}
                value={hours}
                type="number"
                className="w-14 p-2 text-center rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span className="text-xl text-gray-600">:</span>
              <input
                id="minutes"
                placeholder="MM"
                onChange={handleInput}
                value={minutes}
                type="number"
                className="w-14 p-2 text-center rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span className="text-xl text-gray-600">:</span>
              <input
                id="seconds"
                placeholder="SS"
                onChange={handleInput}
                value={seconds}
                type="number"
                className="w-14 p-2 text-center rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              onClick={handleStart}
              className="w-full mt-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Start
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-5xl font-mono text-gray-800 mb-6">
              {String(hours).padStart(2, "0")}:
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setIsRunning(false)}
                className="py-2 px-6 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-300"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="py-2 px-6 bg-red-400 text-white rounded-lg hover:bg-red-500 transition duration-300"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
