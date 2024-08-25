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



    //## needs admin role before testing ##//
    // it('should create a new destination', async () => {
    //     const response = await request(app)
    //         .post('/destinations')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send({
    //             name: 'Test Destination',
    //             location: 'Test Location',
    //             description: 'A test description',
    //             data: fs.readFileSync("./assets/test3.jpg")
    //         });

    //     expect(response.statusCode).toBe(201);
    //     expect(response.body).toHaveProperty('_id');
    //     expect(response.body.name).toBe('Test Destination');
    // });

    it('should get all destinations', async () => {
        const response = await request(app)
            .get('/destinations')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);                       //test that route works and returns something
        expect(response.body).toBeInstanceOf(Array);                 //test that array is returned
        expect(response.body.length).toEqual(4);                     //test that amount of items in array matches destinations
        destinationId = response.body[0]._id;                        //grab the first id for use in the second test    
    });

    it('should get a single destination', async () => {
        const response = await request(app)
            .get(`/destinations/${destinationId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);                       //test that route works and returns something
        expect(response.body).toBeInstanceOf(Object);                //test that object is returned
        expect(response.body).toHaveProperty('_id');                 //test object has correct properties
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('location');
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
                firstName: 'firstName',
                lastName: 'lastName',
                name: 'Test Destination',
                location: 'Test Location',
                description: 'A test description',
                data: fs.readFileSync("./assets/test3.jpg")
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Test Destination');
    });
});
