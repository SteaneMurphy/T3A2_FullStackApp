import { Router } from 'express';
import { Itinerary } from '../db.js';
import authenticate from '../middleware/authenticate.js'; // Middleware for JWT authentication

const router = Router();

// Get list of itineraries
router.get('/itineraries', authenticate, async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ user: req.user.id });
        res.send(itineraries);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get one itinerary
router.get('/itineraries/:id', authenticate, async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (itinerary) {
            res.send(itinerary);
        } else {
            res.status(404).send({ error: 'Itinerary not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Create a new itinerary
router.post('/itineraries', authenticate, async (req, res) => {
    try {
        const newItinerary = await Itinerary.create({ ...req.body, user: req.user.id });
        res.status(201).send(newItinerary);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Update an itinerary
router.put('/itineraries/:id', authenticate, async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        if (itinerary) {
            res.send(itinerary);
        } else {
            res.status(404).send({ error: 'Itinerary not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Delete an itinerary
router.delete('/itineraries/:id', authenticate, async (req, res) => {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (itinerary) {
            res.sendStatus(200);
        } else {
            res.status(404).send({ error: 'Itinerary not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;
