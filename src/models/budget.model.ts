import mongoose, { Schema, Types } from 'mongoose';
import { IBudget } from '../types/types';

const BudgetSchema = new Schema<IBudget>({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Budget = mongoose.model<IBudget>('Budget', BudgetSchema);
export default Budget
