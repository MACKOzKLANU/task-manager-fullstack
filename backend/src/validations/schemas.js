const z = require('zod');

const registerSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Your password must contain at least 8 characters.”"),
    name: z.string().optional()
});

const taskSchema = z.object({
    title: z.string().min(3, "The title must contain at least 3 characters.").max(100),
    description: z.string().optional()
});

module.exports = { registerSchema, taskSchema };