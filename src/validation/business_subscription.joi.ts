
import { EPlans } from '@/enum';
import Joi from 'joi';

/**
 * Joi schema to validate the creation of a Business Subscription.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const createBusinessSubscriptionSchema = Joi.object({
  user: Joi.string().required(), // Expecting a string for ObjectId
  business: Joi.string().required(), // Expecting a string for ObjectId
  customer: Joi.string().required(),
  payment_plan: Joi.string().optional().allow(null),
  plan_name: Joi.string().valid(...Object.values(EPlans)).optional().allow(null),
  subscription_id: Joi.string().optional().allow(null), // Expecting a string for ObjectId
  trial_start: Joi.date().optional().allow(null),
  trial_end: Joi.date().optional().allow(null),
  subscription_start: Joi.date().optional().allow(null),
  subscription_end: Joi.date().optional().allow(null),
  is_trial: Joi.boolean().default(false),
  status: Joi.string().valid('Active', 'Inactive', 'Pending').default('Active'),
  cancel_at_period_end: Joi.boolean().default(false),
  canceled_at: Joi.date().optional().allow(null),
  schedule_plan_id: Joi.string().optional().allow(null),
  schedule_plan_name: Joi.string().valid(...Object.values(EPlans)).optional().allow(null),
  scheduled_change_at: Joi.date().optional().allow(null)
});

/**
 * Joi schema to validate the update of a Business Subscription.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const updateBusinessSubscriptionSchema = createBusinessSubscriptionSchema.fork(
  Object.keys(createBusinessSubscriptionSchema.describe().keys).filter(key => key !== 'status'),
  schema => schema.optional()
);
