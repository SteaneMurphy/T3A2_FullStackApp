import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, Itinerary, Destination } from './db.js';
import fs from 'fs';

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
            { firstName: 'Alice', lastName: 'Test', email: 'alice@example.com', password: hashedPassword, role: 'user' },
            { firstName: 'Bob', lastName: 'Test', email: 'bob@example.com', password: hashedPassword, role: 'user' },
            { firstName: 'Fred', lastName: 'Admin', email: 'fred@example.com', password: hashedPassword, role: 'admin' }
        ];

        const createdUsers = await User.insertMany(users);
        console.log('Added Users.');

        // Create destinations with user reference
        const destinations = [
            //France
            { 
                name: 'Eiffel Tower', 
                location: 'Paris, France', 
                description: `The Eiffel Tower, an iconic symbol of Paris, stands majestically on the Champ de Mars. Built for the 1889 Exposition Universelle, 
                it was designed by Gustave Eiffel and has become one of the most recognizable structures in the world. With its iron lattice structure and stunning 
                panoramic views from its observation decks, the Eiffel Tower attracts millions of visitors annually who marvel at its architectural beauty and historical 
                significance.`,
                data: fs.readFileSync("./assets/france1.jpg")
            },
            { 
                name: 'Louvre Museum', 
                location: 'Paris, France', 
                description: `The Louvre Museum, located in the heart of Paris, is the world’s largest art museum and a historic monument. Originally a royal palace, 
                it was transformed into a public museum during the French Revolution. Home to thousands of works of art, including the Mona Lisa and the Venus de Milo, 
                the Louvre offers a rich exploration of art history and culture through its vast and diverse collection.`,
                data: fs.readFileSync("./assets/france2.jpg")
            },
            { 
                name: 'Chateau de Versailles', 
                location: 'Versailles, France', 
                description: `The Chateau de Versailles, a symbol of the absolute monarchy of the Ancien Régime, is renowned for its opulent architecture and stunning 
                gardens. Located just outside Paris, it was the principal royal residence of France from Louis XIV to Louis XVI. The palace is famous for its Hall of 
                Mirrors, its magnificent fountains, and its beautifully landscaped grounds that reflect the grandeur of French royal history.`,
                data: fs.readFileSync("./assets/france3.jpg")
            },
            { 
                name: 'Cote d\'Azur', 
                location: 'Saint-Tropez, France', 
                description: `Cote d\'Azur, also known as the French Riviera, stretches along the Mediterranean coast from Cannes to the Italian border. This glamorous 
                region is famed for its stunning beaches, luxurious resorts, and picturesque coastal towns such as Nice and Saint-Tropez. The Cote d\'Azur offers a 
                blend of natural beauty and high-end living, making it a popular destination for celebrities and travelers alike.`,
                data: fs.readFileSync("./assets/france4.jpg")
            },
            { 
                name: 'Mont Saint-Michel', 
                location: 'Normandy, France', 
                description: `Mont Saint-Michel is a stunning island commune in Normandy, France, known for its dramatic tides and medieval abbey. Rising from the 
                sea, it has been a strategic fortress, a place of pilgrimage, and a site of remarkable architectural and historical significance. The abbey and the 
                picturesque island village draw visitors with their unique blend of history, culture, and scenic beauty.`,
                data: fs.readFileSync("./assets/france5.jpg")
            },
            { 
                name: 'Loire Valley Castles', 
                location: 'Loire Valley, France', 
                description: `The Loire Valley is celebrated for its picturesque landscapes and impressive collection of castles. Known as the "Garden of France," 
                this region boasts a range of historic chateaux such as Chambord, Chenonceau, and Amboise. Each castle is a testament to the region’s rich history 
                and its role as a center of Renaissance culture and art.`,
                data: fs.readFileSync("./assets/france6.jpg")
            },
            { 
                name: 'Notre Dame Cathedral', 
                location: 'Notre Dame, France', 
                description: `Notre Dame Cathedral, located on the Île de la Cité in Paris, is one of the finest examples of French Gothic architecture. With its 
                iconic twin towers, rose windows, and intricate sculptures, the cathedral has been a central religious and cultural landmark in Paris for centuries. 
                Despite the recent fire, its historical and architectural significance remains profound.`,
                data: fs.readFileSync("./assets/france7.jpg")
            },
            { 
                name: 'Region of Provence', 
                location: 'Provence, France', 
                description: `The Region of Provence is known for its charming villages, lavender fields, and vineyards. This picturesque area in southeastern France 
                offers a blend of natural beauty and cultural heritage, with attractions ranging from Roman ruins to medieval fortresses. The region is also celebrated 
                for its culinary delights and its vibrant arts and festivals.`,
                data: fs.readFileSync("./assets/france8.jpg")
            },
            { 
                name: 'Mont Blanc', 
                location: 'French Alps, France', 
                description: `Mont Blanc, the highest peak in the Alps, is renowned for its breathtaking views and challenging climbs. Located in the French Alps, 
                it is a major destination for mountaineers and outdoor enthusiasts. The surrounding region offers stunning landscapes, including glaciers and high-altitude 
                meadows, attracting visitors with its natural beauty and adventure opportunities.`,
                data: fs.readFileSync("./assets/france9.jpg")
            },
            { 
                name: 'Carcassonne Castle', 
                location: 'Carcassonne, France', 
                description: `Carcassonne Castle is a medieval fortress located in the town of Carcassonne in southern France. With its double walls and numerous 
                towers, the castle is one of the best-preserved examples of medieval military architecture. The city’s historical charm and its well-preserved ramparts 
                make it a fascinating destination for history enthusiasts and tourists alike.`,
                data: fs.readFileSync("./assets/france10.jpg")
            },

            //New York
            { 
                name: 'Statue of Liberty', 
                location: 'New York, USA', 
                description: `The Statue of Liberty, a gift from France, stands proudly on Liberty Island in New York Harbor. Designed by French sculptor Frédéric 
                Auguste Bartholdi and dedicated in 1886, it has become a global symbol of freedom and democracy. The statue’s torch and tablet are iconic representations 
                of enlightenment and the values of liberty. Visitors can explore the statue’s pedestal and observation deck, which offer stunning views of the Manhattan skyline.`,
                data: fs.readFileSync("./assets/ny1.jpg")
            },
            { 
                name: 'Central Park', 
                location: 'New York, USA', 
                description: `Central Park, an expansive green oasis in the heart of Manhattan, offers a respite from the city’s hustle and bustle. Designed by 
                Frederick Law Olmsted and Calvert Vaux, the park features scenic landscapes, walking paths, lakes, and recreational areas. It’s a popular destination for 
                picnics, jogs, and cultural events, with landmarks like Bethesda Terrace and the Central Park Zoo enhancing its appeal.`,
                data: fs.readFileSync("./assets/ny2.jpg")
            },
            { 
                name: 'Times Square', 
                location: 'New York, USA', 
                description: `Times Square, often referred to as "The Cross-roads of the World," is a vibrant commercial and entertainment hub located in Midtown Manhattan. 
                Known for its bright neon lights, bustling crowds, and Broadway theaters, Times Square is a major cultural and tourist destination. The area hosts 
                numerous events, including the famous New Year’s Eve ball drop, making it a focal point of New York City’s energy and excitement.`,
                data: fs.readFileSync("./assets/ny3.jpg")
            },
            { 
                name: 'Empire State Building', 
                location: 'New York, USA', 
                description: `The Empire State Building, an iconic skyscraper and engineering marvel, stands as one of New York City’s most recognizable landmarks. 
                Completed in 1931, it held the title of the world’s tallest building for nearly 40 years. Visitors can take an elevator to the 86th or 102nd-floor observation decks for panoramic views of the city, including landmarks such as the Statue of Liberty and Central Park.`,
                data: fs.readFileSync("./assets/ny4.jpg")
            },
            { 
                name: 'Brooklyn Bridge', 
                location: 'New York, USA', 
                description: `The Brooklyn Bridge, connecting Manhattan and Brooklyn over the East River, is a historic suspension bridge completed in 1883. Designed 
                by John A. Roebling and completed by his son Washington Roebling, the bridge is a marvel of engineering and design. Its pedestrian walkway offers stunning 
                views of the skyline and the river, making it a popular spot for both tourists and locals.`,
                data: fs.readFileSync("./assets/ny5.jpg")
            },
            { 
                name: 'Metropolitan Museum of Art', 
                location: 'New York, USA', 
                description: `The Metropolitan Museum of Art, commonly known as The Met, is one of the largest and most prestigious art museums in the world. Located 
                on the eastern edge of Central Park, the museum’s vast collection spans over 5,000 years of art from various cultures and periods. Highlights include 
                ancient Egyptian artifacts, European paintings, and American decorative arts, providing a comprehensive overview of artistic achievements.`,
                data: fs.readFileSync("./assets/ny6.jpg")
            },
            { 
                name: 'Broadway', 
                location: 'New York, USA', 
                description: `Broadway, the epicenter of American theater, features a renowned collection of theaters located along Broadway Street in Manhattan. Known 
                for its high-quality productions and star-studded performances, Broadway offers a diverse range of shows, from classic musicals to contemporary plays. 
                The district attracts theatergoers from around the world, making it a cornerstone of New York City’s cultural scene.`,
                data: fs.readFileSync("./assets/ny7.jpg")
            },
            { 
                name: 'One World Trade Center', 
                location: 'New York, USA', 
                description: `One World Trade Center, also known as the Freedom Tower, is the main building of the rebuilt World Trade Center complex. Completed in 2013, 
                it stands as the tallest building in the Western Hemisphere. The skyscraper features a unique architectural design and an observation deck that provides 
                breathtaking views of New York City and beyond, symbolizing resilience and renewal after the September 11 attacks.`,
                data: fs.readFileSync("./assets/ny8.jpg")
            },
            { 
                name: 'Fifth Avenue', 
                location: 'New York, USA', 
                description: `Fifth Avenue is a major thoroughfare in Manhattan known for its luxury shopping, historic landmarks, and cultural institutions. Stretching 
                from Washington Square Park to Harlem, Fifth Avenue is home to iconic locations such as St. Patrick’s Cathedral, the New York Public Library, and high-end 
                retail stores. It is often associated with New York City’s affluence and style.`,
                data: fs.readFileSync("./assets/ny9.jpg")
            },
            { 
                name: 'High Line', 
                location: 'New York, USA', 
                description: `The High Line is an elevated linear park built on a historic freight rail line on Manhattan’s West Side. Designed by James Corner Field 
                Operations and Diller Scofidio + Renfro, the park features landscaped gardens, art installations, and stunning views of the city. It offers a unique 
                urban experience, transforming an old railway into a vibrant public space that stretches from Gansevoort Street to 34th Street.`,
                data: fs.readFileSync("./assets/ny10.jpg")
            }
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
                notes: ['Buy tickets in advance'],
                data: fs.readFileSync("./assets/parisOverview.jpg")
            },
            {
                user: createdUsers[1]._id,
                title: 'New York Adventure',
                destinations: [createdDestinations[2]._id, createdDestinations[3]._id],
                activities: ['Sightseeing', 'Park Walk'],
                notes: ['Bring a camera'],
                data: fs.readFileSync("./assets/nyOverview.jpg")
            },
            {
                user: createdUsers[1]._id,
                title: 'New York Adventure 2',
                destinations: [createdDestinations[2]._id, createdDestinations[3]._id],
                activities: ['Sightseeing', 'Park Walk'],
                notes: ['Bring a camera'],
                data: fs.readFileSync("./assets/nyOverview.jpg")
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

