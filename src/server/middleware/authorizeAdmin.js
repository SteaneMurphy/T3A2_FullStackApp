import { User } from '../db.js';

const authorizeAdmin = async (req, res, next) => {
    try {
        // The `authenticate` middleware should have already populated `req.user`
        if (!req.user) return res.status(401).send({ error: 'Access denied' });

        // Fetch the user from the database
        const user = await User.findById(req.user.id);

        // Check if the user is an admin
        if (user.role !== 'admin') {
            return res.status(403).send({ error: 'Access forbidden: Admins only' });
        }

        next(); // User is an admin, allow the request to proceed
    } catch (err) {
        res.status(400).send({ error: 'Authorization error' });
    }
};

export default authorizeAdmin;
