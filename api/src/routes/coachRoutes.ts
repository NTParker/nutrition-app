import express from 'express';
import CoachController from '../controllers/coachController.js';

const coachRouter = express.Router();

coachRouter.post('/', CoachController.create);
coachRouter.get('/:coachId', CoachController.getById);
coachRouter.put('/:coachId', CoachController.update);
coachRouter.delete('/:coachId', CoachController.delete);

export default coachRouter;