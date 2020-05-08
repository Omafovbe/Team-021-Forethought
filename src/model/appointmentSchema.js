const moongoose = require('moongoose');

const { Schema } = moongoose;

const appointmentSchema = new Schema({
  consultant_id: { type: moongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  user_id: { type: moongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduled_date: Date,
  scheduled_time: String

},
{ timestamps: true });

module.exports = moongoose.model('Appointment', appointmentSchema);
