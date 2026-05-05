import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="auth-form">
            <h2>Створити акаунт</h2>
            {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    placeholder="Нікнейм (username)"
                    onChange={handleChange}
                    required
                />
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
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Підтвердіть пароль"
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Реєстрація...' : 'Зареєструватися'}
                </button>
            </form>
        </div>
    );
}

export default Register;