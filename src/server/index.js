import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth_routes.js';
import itineraryRoutes from './routes/itinerary_routes.js';
import destinationRoutes from './routes/destination_routes.js';
import adminRoutes from './routes/admin_routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(itineraryRoutes);
app.use(destinationRoutes);
app.use(adminRoutes);

// Database connection
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Only start the server if this file is executed directly
        if (process.env.NODE_ENV !== 'test') {
            app.listen(4000, () => console.log('Server running on port 4000'));
        }
    })
    .catch(err => console.error(err));

// Export the app for testing
export default app;
