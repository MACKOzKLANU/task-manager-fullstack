require('dotenv').config()
const express = require('express');
const cors = require('cors');

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})