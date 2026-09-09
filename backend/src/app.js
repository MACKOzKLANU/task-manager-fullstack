require('dotenv').config()

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const authRoutes = require('./routes/auth.routes');
const tasksRoutes = require('./routes/tasks.routes');
const usersRoutes = require('./routes/users.routes');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

app.use('/tasks', tasksRoutes);
app.use('/', authRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})