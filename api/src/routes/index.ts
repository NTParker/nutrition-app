import express from 'express';
import clientRoutes from './clientRoutes.js';
import coachRoutes from './coachRoutes.js';
import dailyLogRoutes from './dailyLogRoutes.js';

const router = express.Router();

router.use('/clients', clientRoutes);
router.use('/coaches', coachRoutes);
router.use('/daily-logs', dailyLogRoutes);

export default router;