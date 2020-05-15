const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduled_date: Date,
  scheduled_time: String

},
{ timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
