/**
*  Middleware function to handle validation on ExpressJS Request.
*
*  @param {object} schema - Joi validation schema
*  @param {string} [property=body] - property of the request object (body, query or params)
*
*/

const validReq = (schema, property = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) return res.status(422).json({ error: error.details[0].message });
  return next();
};

module.exports = validReq;
