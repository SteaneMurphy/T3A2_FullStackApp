import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import { User } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

let adminToken;
let testUserId;

beforeAll(async () => {
    // Ensure the admin user exists in the database
    let adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        adminUser = new User({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });
        await adminUser.save();
    }

    // Login as admin to generate a token
    const loginRes = await request(app)
        .post('/login')
        .send({ email: 'admin@example.com', password: 'password123' });

    adminToken = loginRes.body.token;

    // Log the decoded token for debugging
    console.log('Admin Token:', jwt.decode(adminToken));

    // Ensure there is no duplicate user before creating a new one
    await User.deleteOne({ email: 'testuser@example.com' });

    // Create a user to be deleted in the test
    const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: await bcrypt.hash('password123', 10), // Ensure password is hashed
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

        console.log('Response Body:', res.body); // Log the response body for debugging

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted successfully');

        // Verify the user is indeed deleted
        const deletedUser = await User.findById(testUserId);
        expect(deletedUser).toBeNull();
    });
});
