import express from 'express';
import authenticate from '../middleware/authenticate.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import { User } from '../db.js';

const router = express.Router();

router.delete('/admin/delete-user/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

export default router;
