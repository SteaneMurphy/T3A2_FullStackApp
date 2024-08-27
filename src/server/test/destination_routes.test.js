import request from 'supertest';
import app from '../index.js';
import { User } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';

describe('Destination Routes', () => {
    let token;
    let user;
    let destinationId;

    beforeAll(async () => {
        // Create a test user if not exists
        user = await User.findOne({ email: 'testuser@example.com' });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            user = await User.create({ firstName: 'Test', lastName: 'User', email: 'testuser@example.com', password: hashedPassword });
        }
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should get all destinations', async () => {
        const response = await request(app)
            .get('/destinations')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);                       
        expect(response.body).toBeInstanceOf(Array);                 
        expect(response.body.length).toEqual(20);                     
        destinationId = response.body[0]._id;                        
    });

    it('should get a single destination', async () => {
        const response = await request(app)
            .get(`/destinations/${destinationId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);                       
        expect(response.body).toBeInstanceOf(Object);                
        expect(response.body).toHaveProperty('_id');                 
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('destination');
        expect(response.body).toHaveProperty('country');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });

    it('should update a single destination', async () => {
        const response = await request(app)
            .put(`/destinations/${destinationId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'updated name',
                destination: 'updated destination',
                country: 'updated country',
                description: 'updated description',
            });

        expect(response.statusCode).toBe(200);                       
        expect(response.body).toBeInstanceOf(Object);                
        expect(response.body).toHaveProperty('_id');                 
        expect(response.body).toHaveProperty('name', 'updated name');
        expect(response.body).toHaveProperty('destination', 'updated destination');
        expect(response.body).toHaveProperty('country', 'updated country');
        expect(response.body).toHaveProperty('description', 'updated description');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });
});
