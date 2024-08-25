import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../db.js';

const router = Router();

// Register new user (Create)
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).send({ error: 'Email already in use' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, newUser });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Login user (Read)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).send({ error: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, user });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get user details (Read)
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password from the result

        if (!user) return res.status(404).send({ error: 'User not found' });

        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Update user details (Update)
router.put('/user/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const updatedData = {};

        if (firstName) updatedData.firstName = firstName;
        if (lastName) updatedData.lastName = lastName;
        if (email) updatedData.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true }).select('-password'); // Exclude password from the result

        if (!user) return res.status(404).send({ error: 'User not found' });

        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete user account (Delete)
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return res.status(404).send({ error: 'User not found' });

        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;

