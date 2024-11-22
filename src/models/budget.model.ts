import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Budget = mongoose.model('Budget', BudgetSchema);
export default Budget
