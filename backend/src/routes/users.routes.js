const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/auth");
const prisma = require('../lib/prisma');


router.get('/users', authenticate, async (req, res) => {
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

module.exports = router;