// validations/profile_evaluation.joi.ts

import Joi from 'joi';

/**
 * Joi schema for validating the ProfileEvaluation model.
 * This schema defines the validation rules for creating and updating profile evaluations.
 */
export const createProfileEvaluationSchema = Joi.object({
  businessId: Joi.number().required(),
  customerProfileId: Joi.string().required(),
  customerProfileSid: Joi.string().required(),
  evaluationSid: Joi.string().pattern(/^EL[0-9a-fA-F]{32}$/).optional(),
  evaluationStep: Joi.string().valid('assignment', 'evaluation', 'submission').required(),
  status: Joi.string().valid('draft', 'pending-review', 'in-review', 'twilio-rejected', 'twilio-approved', 'compliant', 'noncompliant').default('draft'),
  policySid: Joi.string().optional(),
  primaryProfileSid: Joi.string().optional(),
  primaryAssignmentSid: Joi.string().optional(),
  evaluationResults: Joi.object().optional(),
  validationErrors: Joi.object().optional(),
  submittedAt: Joi.date().optional(),
  approvedAt: Joi.date().optional(),
  rejectedAt: Joi.date().optional(),
  attemptCount: Joi.number().default(1),
  lastAttemptAt: Joi.date().default(() => new Date()),
  retryAfter: Joi.date().optional(),
  complianceScore: Joi.number().min(0).max(100).optional(),
  requiresAttention: Joi.boolean().default(false),
  lastWebhookAt: Joi.date().optional(),
  webhookCount: Joi.number().default(0),
  twilioResponse: Joi.object().optional(),
  errors: Joi.object().optional(),
  notes: Joi.string().optional(),
});

/**
 * Joi schema for updating the ProfileEvaluation model.
 * This schema is used to validate updates to the profile evaluation document.
 */
export const updateProfileEvaluationSchema = createProfileEvaluationSchema.fork(
  ['businessId', 'customerProfileId'],
  (schema) => schema.optional()
);

