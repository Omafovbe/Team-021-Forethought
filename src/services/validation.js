const Joi = require('@hapi/joi');

// Contains all request validation

// Mental Health test
const testValidSchema = Joi.object({
  userId: Joi.string().alphanum().required().messages({ 'any.required': 'The user ID is required to take a test' }),
  ques_1: Joi.number().min(0).max(4).required(),
  ques_2: Joi.number().min(0).max(4).required(),
  ques_3: Joi.number().min(0).max(4).required(),
  ques_4: Joi.number().min(0).max(4).required(),
  ques_5: Joi.number().min(0).max(4).required(),
  ques_6: Joi.number().min(0).max(4).required()
});


module.exports = {
  testValidSchema
};
