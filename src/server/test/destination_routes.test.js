import request from 'supertest';
import app from '../index.js';
import { User } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Destination Routes', () => {
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

    it('should create a new destination', async () => {
        const response = await request(app)
            .post('/destinations')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Destination',
                location: 'Test Location',
                description: 'A test description'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Test Destination');
    });
});
