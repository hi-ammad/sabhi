// validations/subscription_usage.joi.ts

import Joi from 'joi';

/**
 * Joi validation schema for creating a new SubscriptionUsage record.
 * This schema validates the data required to create a new SubscriptionUsage entry.
 * 
 * @constant createSubscriptionUsageSchema
 */
export const createSubscriptionUsageSchema = Joi.object({
  messages: Joi.number().integer().default(0),
  sms: Joi.number().integer().default(0),
  whatsapp: Joi.number().integer().default(0),
  facebook: Joi.number().integer().default(0),
  seats: Joi.number().integer().default(0),
  phone_numbers: Joi.number().integer().default(1),
  payment_links: Joi.number().integer().default(0),
  user_id: Joi.string().required(),
  subscription_id: Joi.string().required(),
});

/**
 * Joi validation schema for updating an existing SubscriptionUsage record.
 * Makes all fields optional except for the forbidden fields (`created_at`, `updated_at`).
 * 
 * @constant updateSubscriptionUsageSchema
 */
export const updateSubscriptionUsageSchema = createSubscriptionUsageSchema.fork(
  Object.keys(createSubscriptionUsageSchema.describe().keys),
  (schema) => schema.optional()
);

