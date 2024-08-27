import express from 'express';
import authenticate from '../middleware/authenticate.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import { User } from '../db.js';


const router = express.Router();

// Create a new user (Admin only)
router.post('/admin/create-user', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }
        
        const newUser = new User({ firstName, lastName, email, password, role });
        await newUser.save();
        
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get a list of all users (Admin only)
router.get('/admin/users', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get a specific user by ID (Admin only)
router.get('/admin/users/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Update a user's details (Admin only)
router.put('/admin/users/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const updatedData = { firstName, lastName, email, role };
        
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete a user (Admin only)
router.delete('/admin/delete-user/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;

