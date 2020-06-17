const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  msgDate: { type: Date, default: Date.now() },
  message: String

},
{ timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
