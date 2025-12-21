import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  completed: Joi.boolean(),
  user: Joi.string().required(), // userId
});

export const updateTodoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  completed: Joi.boolean(),
});

