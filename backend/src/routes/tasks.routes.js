const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { taskSchema } = require('../validations/schemas');
const prisma = require('../lib/prisma');

router.post('/', authenticate, async (req, res) => {
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

router.get('/', authenticate, async (req, res) => {
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

router.patch('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        const validation = taskSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: "Task validation error",
                details: validation.error.issues.map(err => err.message)
            });
        }
        const { title, description } = validation.data;

        const { completed } = req.body

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

router.delete('/:id', authenticate, async (req, res) => {
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

module.exports = router;