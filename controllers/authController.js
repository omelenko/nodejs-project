const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require("../prismaClient");

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body; // Додаємо username

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }] // Перевірка за обома унікальними полями
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email або Username вже зайняті' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(401).json({ message: 'Користувача не знайдено' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Неправильний пароль' });

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};