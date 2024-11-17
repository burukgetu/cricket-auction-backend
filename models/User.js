import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'bidder'], default: 'bidder' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);