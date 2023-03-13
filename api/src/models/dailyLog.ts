import { Document, model, Schema, Types } from 'mongoose';

export interface IDailyLog extends Document {
  clientId: Types.ObjectId;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const dailyLogSchema = new Schema({
  clientId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Client',
  },
  date: {
    type: Date,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
});

const DailyLog = model<IDailyLog>('DailyLog', dailyLogSchema);

export default DailyLog;
