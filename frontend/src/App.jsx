import { useAuth } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
const Login = () => <div className="text-white p-10">Strona Logowania (W budowie)</div>;
const Dashboard = () => <div className="text-white p-10">Twój Panel Zadań (w budowie)</div>;

function App() {
  const { user, loading } = useAuth();

  if (loading) return null;
  

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-200"></div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/"
          element={user ? <Dashboard /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App