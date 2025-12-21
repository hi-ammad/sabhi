import Joi from 'joi';

/**
 * Forbidden fields for ClerkDailyCount (cannot be updated directly)
 */
const forbiddenFields = ['created_at', 'updated_at'];

/* -------------------- Create Schema -------------------- */
export const createClerkDailyCountSchema = Joi.object({
  clerk: Joi.string().required(), // ObjectId as string
  business: Joi.string().required(), // ObjectId as string
  date: Joi.string().isoDate().required(),
  message_count: Joi.number().integer().min(0).default(1),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).fork(forbiddenFields, (schema) => schema.forbidden());

/* -------------------- Update Schema -------------------- */
export const updateClerkDailyCountSchema = createClerkDailyCountSchema.fork(
  Object.keys(createClerkDailyCountSchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);
