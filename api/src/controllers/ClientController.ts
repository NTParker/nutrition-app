import { Request, Response } from 'express';
import ClientModel from '../models/client.js';

class ClientController {
  static async getAll(req: Request, res: Response) {
    try {
      const clients = await ClientModel.find().populate('coachId', 'name');
      res.status(200).json({ clients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      
      const { name, email, password, coachId } = req.body;
      const client = await ClientModel.create({ name, email, password, coachId });
      res.status(201).json({ client });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await ClientModel.findById(id).populate('coachId', 'name');
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(200).json({ client });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password, coachId } = req.body;
      const client = await ClientModel.findByIdAndUpdate(
        id,
        { name, email, password, coachId },
        { new: true },
      );
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(200).json({ client });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await ClientModel.findByIdAndDelete(id);
      if (!client) {
        res.status(404).json({ message: 'Client not found' });
        return;
      }
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ClientController;