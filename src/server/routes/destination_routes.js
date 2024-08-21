import { Router } from 'express';
import { Destination } from '../db.js'; 
import authenticate from '../middleware/authenticate.js'; 

const router = Router();

// Create a new destination (Create)
router.post('/destinations', authenticate, async (req, res) => {
    try {
        const newDestination = await Destination.create({ ...req.body, user: req.user.id });
        res.status(201).send(newDestination);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get a destination (Read)
router.get('/destinations/:id', authenticate, async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (destination) {
            res.send(destination);
        } else {
            res.status(404).send({ error: 'Destination not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get list of all destinations (Read)
router.get('/destinations', authenticate, async (req, res) => {
    try {
        const destinations = await Destination.find({ user: req.user.id });
        res.send(destinations);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Update a destination details (Update)
router.put('/destinations/:id', authenticate, async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (destination) {
            res.send(destination);
        } else {
            res.status(404).send({ error: 'Destination not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete an existing destination (Delete)
router.delete('/destinations/:id', authenticate, async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (destination) {
            res.sendStatus(200);
        } else {
            res.status(404).send({ error: 'Destination not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;
