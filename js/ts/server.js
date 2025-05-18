const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Настройка подключения к базе данных
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'voting_app',
    password: 'your_password',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Обработчик для получения заявок
app.post('/api/applications', async (req, res) => {
    const { candidate, comments } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Заявки (candidate, comments) VALUES (\$1, \$2) RETURNING *',
            [candidate, comments]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при добавлении заявки' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

