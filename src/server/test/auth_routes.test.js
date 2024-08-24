import request from 'supertest';
import app from '../index.js'; 
import { User } from '../db.js'; 
import mongoose from 'mongoose'; 

describe('Auth Routes', () => {
    beforeAll(async () => {
        // Clean up the database before running the test
        await User.deleteOne({ email: 'testuser@example.com' });
    });

    afterAll(async () => {
        // Close the Mongoose connection after tests are done to avoid leaks
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                firstName: 'Test User',
                lastName: 'Test User',
                email: 'testuser@example.com',
                password: 'password123'
            });

        console.log(response.body); // Log the response body to understand the error

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
