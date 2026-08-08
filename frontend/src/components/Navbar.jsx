import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { CheckSquare, LogOut, UserIcon } from 'lucide-react'
function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                        <CheckSquare className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter uppercase">
                        Your <span className="text-blue-500">Tasks</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">

                        <UserIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-mono text-slate-200">
                            {user.name || user.email}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors font-bold text-sm uppercase tracking-wider cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar