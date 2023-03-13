import { Request, Response, NextFunction } from 'express';
import CoachModel from '../models/coach.js';

class CoachController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const newCoach = await CoachModel.create({
        firstName,
        lastName,
        email,
        password,
      });
      res.json(newCoach);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const { coachId } = req.params;
    try {
      const coach = await CoachModel.findOne({ _id: coachId });
      if (!coach) {
        return res.status(404).json({ message: 'Coach not found' });
      }
      res.json(coach);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { coachId } = req.params;
    const { firstName, lastName, email, password } = req.body;
    try {
      const updatedCoach = await CoachModel.findOneAndUpdate(
        { _id: coachId },
        { firstName, lastName, email, password },
        { new: true },
      );
      if (!updatedCoach) {
        return res.status(404).json({ message: 'Coach not found' });
      }
      res.json(updatedCoach);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { coachId } = req.params;
    try {
      const deletedCoach = await CoachModel.findOneAndDelete({ _id: coachId });
      if (!deletedCoach) {
        return res.status(404).json({ message: 'Coach not found' });
      }
      res.json(deletedCoach);
    } catch (error) {
      next(error);
    }
  }
}

export default CoachController;
