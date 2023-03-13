import { Document, model, Schema, Types } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  password: string;
  coachId: Types.ObjectId;
}

const clientSchema = new Schema({
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
  coachId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Coach',
  },
});

const ClientModel = model<IClient>('Client', clientSchema);

export default ClientModel;
