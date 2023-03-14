import express from 'express';
import ClientController from '../controllers/ClientController.js';

const clientRouter = express.Router();

clientRouter.post('/', ClientController.create);
clientRouter.get('/all', ClientController.getAll);
clientRouter.get('/:clientId', ClientController.getById);
clientRouter.put('/:clientId', ClientController.update);
clientRouter.delete('/:clientId', ClientController.delete);

export default clientRouter;
