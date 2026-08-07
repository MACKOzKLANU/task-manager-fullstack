import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/login', formData);

            login(response.data.token, response.data.user);

            navigate('/');
        } catch (error) {
            setError(error.response?.data?.error || "Invalid login data");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-slate-950">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-slate-900 border border-bs-slate-800 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                    Welcome <span className="text-blue-500 text-shadow-sm shadow-blue-500/50">back</span>
                </h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl text-sm font-mono animate-pulse">
                        [ERROR]: {error}
                    </div>
                )}
                <div className="space-y-5">
                    <div className="group">
                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2 group-focus-within:text-blue-500 transition-colors">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleChange}
                            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all placeholder:text-shadow-slate-700"
                            placeholder="johndoe@email.com"
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2 group-focus-within:text-blue-500 transition-colors">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={handleChange}
                            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all placeholder:text-slate-700"
                            placeholder="password..."
                        />
                    </div>
                </div>
                <button type="submit" className="w-full mt-10 p-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all uppercase tracking-widest active:scale-95 shadow-lg shadow-blue-900/20">
                    Log in
                </button>
                
                <p className="mt-6 text-center text-slate-500 text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-400 font-bold transition-colors">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;