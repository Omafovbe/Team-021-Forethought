const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduledDate: Date,
  scheduledTime: String,
  appointmentStatus: { type: String, default: 'pending' }

},
{ timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
