import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"; // Використовуємо інстанс axios, який ми створили раніше

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
                email: formData.email,
                password: formData.password
            });

            if (response.data.token) {
                // Якщо вибрано "Remember Me", можна зберігати токен інакше або на довше
                localStorage.setItem('token', response.data.token);
                if (formData.rememberMe) {
                    localStorage.setItem('rememberUser', 'true');
                }
            }

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (<div className="min-h-screen w-full bg-[#1A1A2E] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] flex items-center justify-center p-4 font-['Inter']">
            <div className="w-full max-w-[448px] flex flex-col items-center">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="relative w-8 h-8">
                            {/* Іконка (спрощена музична нота) */}
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13"></path>
                                <circle cx="6" cy="18" r="3"></circle>
                                <circle cx="18" cy="16" r="3"></circle>
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-medium text-white mb-2 tracking-wide">Welcome Back</h1>
                    <p className="text-[#717182] text-base">Sign in to continue to your music</p>
                </div>

                {/* Form Card */}
                <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {error && (
                            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium ml-1 text-left">Email Address</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-[#717182] outline-none focus:border-white/30 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium ml-1 text-left">Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-[#717182] outline-none focus:border-white/30 transition-all"
                                required
                                />
                                {/* Іконка ока (права частина) */}
                                <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717182] hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-[#717182] hover:text-[#9b9bad] transition-colors">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded bg-white/5 border-white/10 accent-white"
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" title="Coming soon!" className="text-white hover:underline transition-all">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#030213] text-white font-medium py-3 rounded-xl hover:bg-black transition-colors shadow-lg active:scale-[0.98]"
                        >
                            {loading ? 'Processing...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Bottom Link */}
                    <p className="text-center text-sm">
                        <span className="text-[#717182]">Don't have an account? </span>
                        <Link to="/register" className="text-white font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;