import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Itinerary } from './db.js';

async function seed() {
    try {
        // Clear existing data
        await User.deleteMany();
        await Itinerary.deleteMany();
        console.log('Cleared existing data.');

        // Create users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const users = [
            { name: 'Alice', email: 'alice@example.com', password: hashedPassword, role: 'user' }, 
            { name: 'Bob', email: 'bob@example.com', password: hashedPassword, role: 'user' }
        ];
        

        const createdUsers = await User.insertMany(users);
        console.log('Added Users.');

        // Create itineraries
        const itineraries = [
            {
                user: createdUsers[0]._id,
                title: 'Paris Trip',
                destinations: ['Eiffel Tower', 'Louvre Museum'],
                activities: ['Sightseeing', 'Museum Tour'],
                notes: ['Buy tickets in advance']
            },
            {
                user: createdUsers[1]._id,
                title: 'New York Adventure',
                destinations: ['Statue of Liberty', 'Central Park'],
                activities: ['Sightseeing', 'Park Walk'],
                notes: ['Bring a camera']
            }
        ];

        await Itinerary.insertMany(itineraries);
        console.log('Added Itineraries.');

        mongoose.disconnect();
        console.log('Seed data created and MongoDB connection closed.');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

mongoose.connect(process.env.DB_URI).then(seed);
