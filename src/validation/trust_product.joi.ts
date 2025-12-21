// validations/trustProduct.joi.ts

import Joi from 'joi';

/**
 * Joi validation schema for creating a new TrustProduct.
 * This schema validates the data required to create a new TrustProduct record.
 * 
 * @constant createTrustProductSchema
 */
export const createTrustProductSchema = Joi.object({
  business_id: Joi.string().required(),
  trust_product_sid: Joi.string().optional().pattern(/^BU[0-9a-fA-F]{32}$/),
  friendly_name: Joi.string().required(),
  email: Joi.string().email().required(),
  policy_sid: Joi.string().default('RNb0d4771c2c98518d916a3d4cd70a8f8b').required(),
  status: Joi.string()
    .valid('draft', 'pending-review', 'in-review', 'twilio-approved', 'twilio-rejected')
    .default('draft'),
  status_callback: Joi.string().uri().optional(),
  valid_until: Joi.date().optional(),
  current_step: Joi.string()
    .valid('creation', 'messaging_info', 'enduser_attach', 'profile_attach', 'evaluation', 'submission')
    .default('creation'),
  steps_completed: Joi.array().items(Joi.string()).default([]),
  customer_profile_sid: Joi.string().optional(),
  customer_profile_id: Joi.string().optional(),
  messaging_profile_end_user_sid: Joi.string().optional(),
  evaluation_status: Joi.string()
    .valid('not_evaluated', 'compliant', 'noncompliant', 'pending_evaluation', 'evaluation_failed')
    .default('not_evaluated'),
  evaluation_sid: Joi.string().optional(),
  evaluation_results: Joi.object().optional(),
  evaluation_errors: Joi.object().optional(),
  submitted_at: Joi.date().optional(),
  approved_at: Joi.date().optional(),
  rejected_at: Joi.date().optional(),
  rejection_reason: Joi.string().optional(),
  twilio_response: Joi.object().optional(),
  webhook_events: Joi.array().items(Joi.object()).default([]),
});

/**
 * Joi validation schema for updating an existing TrustProduct.
 * 
 * @constant updateTrustProductSchema
 */
export const updateTrustProductSchema = createTrustProductSchema.fork(
  Object.keys(createTrustProductSchema.describe().keys),
  (schema) => schema.optional()
);

