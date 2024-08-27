import request from 'supertest';
import app from '../index.js';
import { User, Itinerary } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


describe('Itinerary Routes', () => {
    let token;
    let user;
    let testItineraryId;

    beforeAll(async () => {
        // Create a test user if not exists
        user = await User.findOne({ email: 'testuser@example.com' });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            user = await User.create({ firstName: 'Test', lastName: 'User', email: 'testuser@example.com', password: hashedPassword });
        }
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create a test itinerary for update and delete tests
        const testItinerary = new Itinerary({
            user: user._id,
            title: 'Test Itinerary',
            destinations: ['Test Destination'],
            activities: ['Test Activity'],
            notes: ['Test Note']
        });

        const savedItinerary = await testItinerary.save();
        testItineraryId = savedItinerary._id;
    });

    afterAll(async () => {
        // Clean up by removing the test itinerary and user after tests
        await Itinerary.findByIdAndDelete(testItineraryId);
        await User.findByIdAndDelete(user._id);
    });

    it('should get a list of itineraries', async () => {
        const response = await request(app)
            .get('/trips')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a single itinerary by ID', async () => {
        const response = await request(app)
            .get(`/trips/${testItineraryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', 'Test Itinerary');
    });

    it('should create a new itinerary', async () => {
        const newItinerary = {
            title: 'New Itinerary',
            destinations: ['New Destination'],
            activities: ['New Activity'],
            notes: ['New Note']
        };

        const response = await request(app)
            .post('/trips')
            .set('Authorization', `Bearer ${token}`)
            .send(newItinerary);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Itinerary');

        // Clean up the newly created itinerary
        await Itinerary.findByIdAndDelete(response.body._id);
    });

    it('should update an existing itinerary', async () => {
        const updatedData = {
            title: 'Updated Itinerary',
            destinations: ['Updated Destination'],
            activities: ['Updated Activity'],
            notes: ['Updated Note']
        };

        const response = await request(app)
            .put(`/trips/${testItineraryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Itinerary');
    });

    it('should delete an itinerary', async () => {
        const response = await request(app)
            .delete(`/trips/${testItineraryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        // Verify the itinerary is indeed deleted
        const deletedItinerary = await Itinerary.findById(testItineraryId);
        expect(deletedItinerary).toBeNull();
    });
});
