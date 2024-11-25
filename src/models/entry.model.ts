import mongoose, {Schema, Types} from 'mongoose';
import { IEntry } from '../types/types';

const EntrySchema = new Schema<IEntry>({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, default: '' },
}, { timestamps: true });

const Entry = mongoose.model('Entry', EntrySchema);
export default Entry