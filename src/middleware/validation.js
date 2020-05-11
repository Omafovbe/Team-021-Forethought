const Joi = require('joi');

function validateUser(user){
  const schema = {
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    email: Joi.string().email().max(255).lowercase().required(),
    password: Joi.string().min(6).max(255).required(),
    phone: Joi.string().min(11).max(15).required(),
    birth_date: Joi.date()
  }

  return Joi.validate(user,schema);
}

function validateConsultant(consultant) {
  const schema = {
    firstname: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    email: Joi.string().email().max(255).required().lowercase(),
    password: Joi.string().min(6).max(255).required().strict(),
    phone: Joi.string().min(11).max(15).required(),
    certification: Joi.array(),
    workplace: Joi.string()
  }

  return Joi.validate(consultant, schema);
}

function validateLogin(req) {
  const schema = {
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).max(255).required().strict()
  };

  return Joi.validate(req, schema);
}

exports.validateUser = validateUser;
exports.validateConsultant = validateConsultant;
exports.validateLogin = validateLogin;