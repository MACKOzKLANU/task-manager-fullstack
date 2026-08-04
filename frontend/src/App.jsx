import { useEffect, useState } from "react"
import api from "./api/axios";

function App() {
  const [status, setStatus] = useState('Connecting to the server…');

  useEffect(() => {
    api.get('/health')
    .then(res => {
      console.log("Data from the server: ", res.data);
      setStatus(`Online: ${res.data.status}`);
    })
    .catch(err => {
      console.error("Connection error: ", err);
      setStatus('The server is not responding (OFFLINE)');
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className={`p-8 rounded-2xl border-2 transition-all duration-500 ${
        status.includes('Online') ? 'border-green-500 shadow-green-500/20' : 'border-red-500 shadow-red-500/20'
      } bg-slate-800 shadow-2xl`}>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
          System OS <span className="text-blue-500">v1.0</span>
        </h1>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full animate-pulse ${
            status.includes('Online') ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <p className="font-mono text-slate-300">{status}</p>
        </div>
      </div>

    </div>
  )
}
export default App