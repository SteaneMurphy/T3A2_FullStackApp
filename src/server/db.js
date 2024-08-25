import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

mongoose.connect(process.env.DB_URI)
    .then(m => console.log(m.connection.readyState == 1 ? 'Mongoose connected' : 'Mongoose failed to connect'))
    .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' } 
});

const itinerarySchema = new mongoose.Schema({
    user: { type: mongoose.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    destinations: [{ type: String }],
    activities: [{ type: String }],
    notes: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    data: { type: Buffer },
}, {
    timestamps: true 
});

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    data: { type: Buffer },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
const Itinerary = mongoose.model('Itinerary', itinerarySchema);
const Destination = mongoose.model('Destination', destinationSchema);

export { User, Itinerary, Destination };
