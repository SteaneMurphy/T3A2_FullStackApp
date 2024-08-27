import request from 'supertest';
import app from '../index.js';
import { User, Destination } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Destination Routes', () => {
    let token;
    let adminToken;
    let user;
    let adminUser;
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

        // Create a test admin user
        adminUser = await User.findOne({ email: 'admin@example.com' });
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            adminUser = await User.create({ 
                firstName: 'Admin', 
                lastName: 'User', 
                email: 'admin@example.com', 
                password: hashedPassword,
                role: 'admin'
            });
        }
        adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Create a test destination for other tests
        const testDestination = new Destination({
            user: adminUser._id,
            name: 'Eiffel Tower',
            destination: 'Paris',
            country: 'France',
            description: 'The Eiffel Tower, an iconic symbol of Paris, stands majestically on the Champ de Mars. Built for the 1889 Exposition Universelle, it was designed by Gustave Eiffel and has become one of the most recognizable structures in the world.'
        });
        const savedDestination = await testDestination.save();
        destinationId = savedDestination._id;
    });

    afterAll(async () => {
        // Clean up by removing the test destination and users after tests
        await Destination.findByIdAndDelete(destinationId);
        await User.findOneAndDelete({ email: 'testuser@example.com' });
        await User.findOneAndDelete({ email: 'admin@example.com' });
    });

    it('should get all destinations', async () => {
        const response = await request(app)
            .get('/destinations')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        destinationId = response.body[0]._id;
    });

    it('should get a single destination', async () => {
        const response = await request(app)
            .get(`/destinations/${destinationId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('_id', destinationId.toString());
        expect(response.body).toHaveProperty('name', 'Eiffel Tower');
        expect(response.body).toHaveProperty('destination', 'Paris');
        expect(response.body).toHaveProperty('country', 'France');
        expect(response.body.description).toContain('an iconic symbol of Paris'); // More stable substring
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });

    it('should update a single destination', async () => {
        const response = await request(app)
            .put(`/destinations/${destinationId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'updated name',
                destination: 'updated destination',
                country: 'updated country',
                description: 'updated description',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('_id', destinationId.toString());
        expect(response.body).toHaveProperty('name', 'updated name');
        expect(response.body).toHaveProperty('destination', 'updated destination');
        expect(response.body).toHaveProperty('country', 'updated country');
        expect(response.body).toHaveProperty('description', 'updated description');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    });

    it('should delete a destination', async () => {
        const newDestination = new Destination({
            user: adminUser._id, // Admin user creating the destination
            name: 'To Be Deleted',
            destination: 'Delete City',
            country: 'Delete Country',
            description: 'To Be Deleted Description',
        });

        const savedDestination = await newDestination.save();

        const response = await request(app)
            .delete(`/destinations/${savedDestination._id}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);

        // Verify the destination is indeed deleted
        const deletedDestination = await Destination.findById(savedDestination._id);
        expect(deletedDestination).toBeNull();
    });
});
