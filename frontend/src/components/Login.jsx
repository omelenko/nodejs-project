import { useState } from 'react';
import api from '../api.js'; // Використовуємо інстанс axios, який ми створили раніше

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/users/login', formData);
            localStorage.setItem('token', response.data.token);
            window.location.href = '/'; // Або використовуй useNavigate з react-router-dom
        } catch (err) {
            setError(err.response?.data?.message || 'Щось пішло не так');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Вхід у систему</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder="Електронна пошта"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Вхід...' : 'Увійти'}
                </button>
            </form>
        </div>
    );
}

export default Login;