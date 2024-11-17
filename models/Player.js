import mongoose from 'mongoose';
 
const playerSchema = mongoose.Schema({
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: [
      'OpeningBatsman',
      'MiddleOrderBatsman',
      'LowerOrderBatsman',
      'FastBowler',
      'MediumPaceBowler',
      'OffSpinner',
      'LegSpinner',
      'AllRounder',
      'Wicketkeeper',
      'SlipFielder',
      'CloseInFielder',
      'BoundaryFielder'
    ], 
    required: true 
  },
  startingPrice: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model('Player', playerSchema);