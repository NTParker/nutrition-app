import express from 'express';
import DailyLogController from '../controllers/DailyLogController.js';

const dailyLogRouter = express.Router();

dailyLogRouter.post('/', DailyLogController.create);
dailyLogRouter.get('/:clientId', DailyLogController.getByClientId);
dailyLogRouter.put('/:dailyLogId', DailyLogController.update);
dailyLogRouter.delete('/:dailyLogId', DailyLogController.delete);

export default dailyLogRouter;