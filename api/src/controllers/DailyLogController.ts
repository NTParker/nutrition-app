import { Request, Response, NextFunction } from 'express';
import DailyLogModel from '../models/dailyLog.js';

class DailyLogController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { clientId, macronutrients } = req.body;
    try {
      const newDailyLog = await DailyLogModel.create({
        clientId,
        macronutrients,
      });
      res.json(newDailyLog);
    } catch (error) {
      next(error);
    }
  }

  static async getByClientId(req: Request, res: Response, next: NextFunction) {
    const { clientId } = req.params;
    try {
      const dailyLogs = await DailyLogModel.find({ clientId });
      res.json(dailyLogs);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { dailyLogId } = req.params;
    const { macronutrients } = req.body;
    try {
      const updatedDailyLog = await DailyLogModel.findByIdAndUpdate(
        dailyLogId,
        { macronutrients },
        { new: true },
      );
      res.json(updatedDailyLog);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { dailyLogId } = req.params;
    try {
      const deletedDailyLog = await DailyLogModel.findByIdAndDelete(dailyLogId);
      res.json(deletedDailyLog);
    } catch (error) {
      next(error);
    }
  }
}

export default DailyLogController;
