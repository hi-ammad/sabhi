import Joi from 'joi';

/**
 * Forbidden fields for ClerkMonthlyCount (cannot be updated directly)
 */
const forbiddenFields = ['created_at', 'updated_at'];

/* -------------------- Create Schema -------------------- */
export const createClerkMonthlyCountSchema = Joi.object({
  clerk: Joi.string().required(), // ObjectId as string
  business: Joi.string().required(), // ObjectId as string
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().required(),
  message_count: Joi.number().integer().min(0).default(1),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).fork(forbiddenFields, (schema) => schema.forbidden());

/* -------------------- Update Schema -------------------- */
export const updateClerkMonthlyCountSchema = createClerkMonthlyCountSchema.fork(
  Object.keys(createClerkMonthlyCountSchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);
