
import Joi from 'joi';

/**
 * Forbidden fields for ClerkWeeklyCount (cannot be updated directly)
 */
const forbiddenFields = ['created_at', 'updated_at'];

/* -------------------- Create Schema -------------------- */
export const createClerkWeeklyCountSchema = Joi.object({
  clerk: Joi.string().required(), // ObjectId as string
  business: Joi.string().required(), // ObjectId as string
  week: Joi.number().integer().min(1).max(53).required(),
  year: Joi.number().integer().required(),
  message_count: Joi.number().integer().min(0).default(1),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).fork(forbiddenFields, (schema) => schema.forbidden());

/* -------------------- Update Schema -------------------- */
export const updateClerkWeeklyCountSchema = createClerkWeeklyCountSchema.fork(
  Object.keys(createClerkWeeklyCountSchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);
