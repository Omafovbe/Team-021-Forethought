const mongoose = require('mongoose');

const { Schema } = mongoose;

const mentalTestSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ques_1: { type: Number, required: true },
  ques_2: { type: Number, required: true },
  ques_3: { type: Number, required: true },
  ques_4: { type: Number, required: true },
  ques_5: { type: Number, required: true },
  ques_6: { type: Number, required: true },
  testResult: { type: Number, default: 0 },
  severity: {
    grade: Number,
    class: String
  }
},
{ timestamps: true });

module.exports = mongoose.model('MentalTest', mentalTestSchema);
