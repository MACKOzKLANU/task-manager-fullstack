const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/auth");
const prisma = require('../lib/prisma');

router.get('/', authenticate, async (req, res) => {
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

// GET /me
// Zwraca: { id, email, name, ... }
// Auth: JWT (authenticate middleware)
// Body: nic

router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            },
            select: { 
                id: true, email: true, name: true 
            }
            
        })
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user profile." });
    }
})

// PATCH /me
// Aktualizuje: name (lub co masz w modelu)
// Auth: JWT
// Body:  { name } — bez hasła

router.patch('/me', authenticate, async (req, res) => {
    try {
        const validation = updateUserSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                error: "Validation error",
                details: validation.error.issues.map(err => err.message)
            });
        }

        const { userId} = req.user;
        const { name } = validation.data

        const user = await prisma.user.update({
            where: {id: userId},
            select: { 
                id: true, email: true, name: true 
            },
            data: {name: name}
        
        })
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to update user name."} );
    }
})

// PATCH /me/email
// Aktualizuje: email
// Auth: JWT
// Body: { newEmail, currentPassword } ← hasło weryfikacji!
// Error: jeśli hasło źle

// PATCH /me/password
// Aktualizuje: hasło
// Auth: JWT
// Body: { currentPassword, newPassword } ← stare + nowe
// Error: jeśli stare hasło źle
module.exports = router;