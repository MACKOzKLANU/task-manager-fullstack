require('dotenv').config()

const authenticate = require('./middleware/auth');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const { registerSchema, taskSchema } = require('./validations/schemas');
const prisma = require('./lib/prisma');
const app = express();
const port = process.env.PORT || 8000;

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

app.get('/users', authenticate, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database connection error" });
    }
})

app.post('/tasks', authenticate, async (req, res) => {
    try {
        const validation = taskSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: "Task validation error",
                details: validation.error.issues.map(err => err.message)
            });
        }

        const { title, description } = validation.data;

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                authorId: req.user.userId
            }
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create the task." });
    }
})

app.get('/tasks', authenticate, async (req, res) => {
    try {
        const tasks = await prisma.user.findUnique({
            where: { id: req.user.userId }
        }).tasks();

        res.json(tasks || []);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error." });
    }
})

app.patch('/tasks/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });

        if (!task || task.authorId !== req.user.userId) {
            return res.status(403).json({ error: "You don’t have permission to edit this task." });
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, description, completed }
        });

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update the task." });
    }
})

app.delete('/tasks/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });

        if (!task || task.authorId !== req.user.userId) {
            return res.status(403).json({ error: "You cannot delete someone else’s task." });
        }

        await prisma.task.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: "Task deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the task." });
    }
});

app.post('/register', async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: "Validation error",
                details: validation.error.issues.map(err => err.message)
            });
        }

        const { email, password, name } = validation.data

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ error: "This email is already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser.id,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed due to a server error." });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed due to a server error." });
    }

});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})