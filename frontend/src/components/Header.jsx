import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberUser');

        navigate('/login');
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="h-16 bg-black/20 border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-black/20 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                </div>
                <span className="text-lg font-semibold tracking-tight text-white">MusicStream</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                <NavLink to="/" label="Home" active={isActive('/')} />
                <NavLink to="/search" label="Search" active={isActive('/search')} />
                <NavLink to="/library" label="Library" active={isActive('/library')} />
                <NavLink to="/liked" label="Liked Songs" active={isActive('/liked')} />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                {token ? (
                    /* Кнопка виходу, якщо токен є */
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 px-6 py-2 rounded-full text-sm font-medium text-red-200 transition-all"
                    >
                        Logout
                    </button>
                ) : (
                    /* Кнопки входу/реєстрації, якщо токена немає */
                    <>
                        <Link
                            to="/login"
                            className="text-sm font-medium text-[#717182] hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="bg-black/40 hover:bg-black/60 px-6 py-2 rounded-full border border-white/10 text-sm font-medium text-white transition-all shadow-lg"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

// Внутрішній компонент для посилань, щоб уникнути дублювання стилів
const NavLink = ({ to, label, active }) => (
    <Link
        to={to}
        className={`text-sm font-medium transition-colors ${
            active ? 'text-white' : 'text-[#717182] hover:text-white'
        }`}
    >
        {label}
    </Link>
);

export default Header;