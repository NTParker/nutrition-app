import { Document, model, Schema } from 'mongoose';

export interface ICoach extends Document {
  name: string;
  email: string;
  password: string;
}

const coachSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CoachModel = model<ICoach>('Coach', coachSchema);

export default CoachModel;
