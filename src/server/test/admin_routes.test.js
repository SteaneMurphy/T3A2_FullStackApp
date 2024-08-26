import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import { User } from '../db.js';

let adminToken;
let testUserId;

beforeAll(async () => {
    // Assuming your seed data includes an admin user
    const loginRes = await request(app)
        .post('/login')
        .send({ email: 'admin@example.com', password: 'password123' });

    adminToken = loginRes.body.token;

    // Create a user to be deleted in the test
    const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'password123',  // Assuming passwords are hashed in a pre-save hook
        role: 'user'
    });

    const savedUser = await testUser.save();
    testUserId = savedUser._id;  // Save the user's ID for deletion
});

afterAll(async () => {
    // Clean up by removing the test user and closing the database connection
    await User.findByIdAndDelete(testUserId);
    await mongoose.connection.close();
});

describe('Admin-only routes', () => {
    it('should allow an admin to delete a user', async () => {
        const res = await request(app)
            .delete(`/admin/delete-user/${testUserId}`)  // Use the actual user ID created in the test
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });
});
