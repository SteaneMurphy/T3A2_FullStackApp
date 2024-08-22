import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Itinerary, Destination } from './db.js';

async function seed() {
    try {
        // Clear existing data
        await User.deleteMany();
        await Itinerary.deleteMany();
        await Destination.deleteMany();
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

        // Create destinations with user reference
        const destinations = [
            { name: 'Eiffel Tower', location: 'Paris, France', user: createdUsers[0]._id },
            { name: 'Louvre Museum', location: 'Paris, France', user: createdUsers[0]._id },
            { name: 'Statue of Liberty', location: 'New York, USA', user: createdUsers[1]._id },
            { name: 'Central Park', location: 'New York, USA', user: createdUsers[1]._id }
        ];

        const createdDestinations = await Destination.insertMany(destinations);
        console.log('Added Destinations.');

        // Create itineraries with references to destinations
        const itineraries = [
            {
                user: createdUsers[0]._id,
                title: 'Paris Trip',
                destinations: [createdDestinations[0]._id, createdDestinations[1]._id],
                activities: ['Sightseeing', 'Museum Tour'],
                notes: ['Buy tickets in advance']
            },
            {
                user: createdUsers[1]._id,
                title: 'New York Adventure',
                destinations: [createdDestinations[2]._id, createdDestinations[3]._id],
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

