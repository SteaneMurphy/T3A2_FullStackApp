import request from 'supertest';
import app from '../index.js'; 
import { User } from '../db.js'; 
import mongoose from 'mongoose'; 

let testUserId;
let authToken;

describe('Auth Routes', () => {
    beforeAll(async () => {
        // Clean up the database before running the tests
        await User.deleteOne({ email: 'testuser@example.com' });
        await User.deleteOne({ email: 'updateduser@example.com' });
    });

    afterAll(async () => {
        // Clean up by removing the test user and closing the database connection
        await User.findByIdAndDelete(testUserId);
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

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('newUser');
        expect(response.body.newUser).toHaveProperty('email', 'testuser@example.com');

        // Save the user ID and token for further tests
        testUserId = response.body.newUser._id;
        authToken = response.body.token;
    });

    it('should login the registered user', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('email', 'testuser@example.com');

        // Save the token for authenticated requests
        authToken = response.body.token;
    });

    it('should get user details', async () => {
        const response = await request(app)
            .get(`/user/${testUserId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('email', 'testuser@example.com');
    });

    it('should update the user details', async () => {
        const updatedData = {
            firstName: 'Updated',
            lastName: 'User',
            email: 'updateduser@example.com',
        };

        const response = await request(app)
            .put(`/user/${testUserId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('email', 'updateduser@example.com');
        expect(response.body).toHaveProperty('firstName', 'Updated');
        expect(response.body).toHaveProperty('lastName', 'User');
    });

    it('should delete the user account', async () => {
        const response = await request(app)
            .delete(`/user/${testUserId}`)
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');

        // Verify the user is indeed deleted
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).toBeNull();
    });
});
