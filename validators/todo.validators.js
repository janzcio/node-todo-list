const Joi = require('joi');  // Import the Joi library

// Define a schema for validating todo data
const todoSchema = Joi.object({
  name: Joi.string().required(),  // Update the field name
  done: Joi.number().valid(0, 1).required(),
});

// Validation middleware for creating a new todo
const validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();  // Move to the next middleware
};

// Validation middleware for updating a todo
const validateUpdateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();  // Move to the next middleware
};

module.exports = {
  validateTodo,
  validateUpdateTodo,
};