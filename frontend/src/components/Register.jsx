import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../api.js'; // Твій інстанс axios з перехоплювачами

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Проста валідація паролів на фронтенді
        if (formData.password !== formData.confirmPassword) {
            return setError('Паролі не співпадають');
        }

        setLoading(true);
        try {
            console.log("try")
            // Відправляємо дані на твій Express бекенд
            await api.post('/users/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            navigate('/login');
        } catch (err) {
            console.log("catch")
            setError(err.response?.data?.message || 'Помилка при реєстрації');
        } finally {
            console.log("finally")
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#1A1A2E] p-4 font-['Inter']">
            {/* Background Gradient Layer */}
            <div className="fixed inset-0 bg-linear-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] z-0"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#030213]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {/* Music Icon Symbol */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18V5l12-2v13"></path>
                            <circle cx="6" cy="18" r="3"></circle>
                            <circle cx="18" cy="16" r="3"></circle>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-medium text-white tracking-wide">Create Account</h1>
                    <p className="text-[#717182] mt-2">Join our music community today</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name / Username */}
                        <div className="space-y-2">
                            <label className="block text-white text-sm font-medium text-left">Full Name</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-[#717182] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-white text-sm font-medium text-left">Email Address</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-[#717182] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-white text-sm font-medium text-left">Password</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-[#717182] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="block text-white text-sm font-medium text-left">Confirm Password</label>
                            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]">
                   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder-[#717182] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#030213] text-white font-medium py-3 rounded-xl hover:bg-black transition-colors shadow-lg active:scale-[0.98]"
                        >
                            {loading ? 'Processing...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-[#717182]">Already have an account? </span>
                        <Link to="/login" className="text-white hover:underline">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;