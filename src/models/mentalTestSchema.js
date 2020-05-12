const moongoose = require('moongoose');

const { Schema } = moongoose;

const mentalTestSchema = new Schema({
  user_id: { type: moongoose.Schema.Types.ObjectId, ref: 'User' },
  ques_1: { type: Number, required: true },
  ques_2: { type: Number, required: true },
  ques_3: { type: Number, required: true },
  ques_4: { type: Number, required: true },
  ques_5: { type: Number, required: true },
  ques_6: { type: Number, required: true },
  testResult: { type: Number, default: 0 }
},
{ timestamps: true });

module.exports = moongoose.model('mentalTest', mentalTestSchema);
