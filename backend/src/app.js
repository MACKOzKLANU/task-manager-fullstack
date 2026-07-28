require('dotenv').config()
const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


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

app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database connection error"});
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})