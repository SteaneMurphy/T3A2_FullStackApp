import request from 'supertest';
import app from '../index.js';
import { User } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Itinerary Routes', () => {
    let token;
    let user;

    beforeAll(async () => {
        // Create a test user if not exists
        user = await User.findOne({ email: 'testuser@example.com' });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            user = await User.create({ name: 'Test User', email: 'testuser@example.com', password: hashedPassword });
        }
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should get a list of itineraries', async () => {
        const response = await request(app)
            .get('/trips')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
