const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  uid: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

exports.validateSignup = validator(signupSchema);
