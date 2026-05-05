const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Отримуємо токен з "Bearer <token>"

    if (!token) return res.status(401).json({ message: "Токен відсутній" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Токен недійсний" });
        req.user = user; // Додаємо дані користувача в об'єкт запиту
        next(); // Переходимо до наступної функції
    });
};

module.exports = authenticateToken;