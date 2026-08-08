import { useAuth } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const Dashboard = () => <div className="text-white p-10">Twój Panel Zadań (w budowie)</div>;

function App() {
  const { user, loading } = useAuth();

  if (loading) return null;


  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Navbar />
        
        <Routes>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App