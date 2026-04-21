const express = require('express');
const app = express();
const port = 3000;

// Мідлвар для обробки JSON (знадобиться пізніше)
app.use(express.json());

// Головна сторінка
app.get('/', (req, res) => {
    res.send('Привіт! Це чистий проект на Express.');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});