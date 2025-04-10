import { useState } from "react"

interface HistoryData {
  key: string,
  prev: number,
  curr: number
}

function App() {
  const [value, setValue] = useState<number>(0)
  const [history, setHistory] = useState<HistoryData[]>([])
  const [redolist, setRedolist] = useState<HistoryData[]>([])
  const [undoCount, setUndoCount] = useState<number>(0)

  const maintainHistory = (key: string, prev: number, curr: number) => {
    const data = {
      key,
      prev,
      curr
    }
    const copyhistory = [...history]
    copyhistory.unshift(data)
    setHistory(copyhistory)
  }

  const handleClick = (key: string) => {
    const val = parseInt(key)
    maintainHistory(key, value, value + val)
    setValue((exsitingval) => exsitingval + val)
  }

  const handleUndo = () => {
    if (history.length) {
      if (undoCount + 1 >= 5) {
        alert("you cant undo more than 5 times");
        return;
      }
      setUndoCount((cnt) => cnt + 1)
      const copyhist = [...history]
      const firstitem = copyhist.shift()!;
      setHistory(copyhist)

      setValue(firstitem.prev)

      const copyredolist = [...redolist]
      copyredolist.push(firstitem)
      setRedolist(copyredolist)
    }
  }


  const handleRedo = () => {
    if (redolist.length) {
      const copyredolist = [...redolist];
      const poppedval = copyredolist.pop()!;
      setRedolist(copyredolist);
      const { key, curr, prev } = poppedval;
      setValue(curr)
      maintainHistory(key, curr, prev);
    }
  }

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-start p-6 font-sans">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8 drop-shadow-sm"> Undoable Counter </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleUndo}
          className="px-5 py-2 bg-yellow-300 text-yellow-900 rounded-full shadow hover:bg-yellow-400 transition"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          className="px-5 py-2 bg-teal-300 text-teal-900 rounded-full shadow hover:bg-teal-400 transition"
        >
          Redo
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        {['-100', '-10', '-1'].map((btn, idx) => {
          const bgColors = ['bg-rose-200', 'bg-orange-200', 'bg-pink-200'];
          const textColors = ['text-rose-800', 'text-orange-800', 'text-pink-800'];
          return (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`px-4 py-2 ${bgColors[idx]} ${textColors[idx]} rounded-lg hover:brightness-110 transition w-20 text-sm shadow`}
            >
              {btn}
            </button>
          );
        })}

        <div className="text-5xl font-bold text-indigo-600 px-4">{value}</div>

        {['+1', '+10', '+100'].map((btn, idx) => {
          const bgColors = ['bg-green-200', 'bg-blue-200', 'bg-cyan-200'];
          const textColors = ['text-green-800', 'text-blue-800', 'text-cyan-800'];
          return (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`px-4 py-2 ${bgColors[idx]} ${textColors[idx]} rounded-lg hover:brightness-110 transition w-20 text-sm shadow`}
            >
              {btn}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 border border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-500 mb-2">🕒 History</h2>
        <div className="h-48 overflow-y-auto space-y-2">
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm text-center pt-6">No actions yet 💤</p>
          ) : (
            history.map((item: HistoryData, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg text-sm shadow-sm"
              >
                <span className="font-medium">{item.key}</span>
                <span className="font-mono">{item.prev} → {item.curr}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

}

export default App
