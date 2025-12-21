import Joi, { type Schema } from "joi";

/**
 * Forbidden fields for API requests
 */
const forbiddenFields: string[] = [];

/**
 * Base Joi schema for A2P EndUser
 */
const baseSchema: { [key: string]: Schema } = {
  businessId: Joi.string().required().messages({
    'string.base': `"businessId" should be a type of 'string'`,
    'any.required': `"businessId" is a required field`,
  }),

  trustProductId: Joi.string().optional().allow(null).messages({
    'string.base': `"trustProductId" should be a type of 'string'`,
  }),

  endUserSid: Joi.string().pattern(/^IT[0-9a-fA-F]{32}$/, 'Twilio EndUser SID').optional().allow(null).messages({
    'string.pattern.base': `"endUserSid" should match the pattern /^IT[0-9a-fA-F]{32}$/`,
  }),

  friendlyName: Joi.string().required().messages({
    'string.base': `"friendlyName" should be a type of 'string'`,
    'any.required': `"friendlyName" is a required field`,
  }),

  type: Joi.string().valid('us_a2p_messaging_profile_information').required().messages({
    'string.base': `"type" should be a type of 'string'`,
    'any.required': `"type" is a required field`,
    'string.valid': `"type" must be 'us_a2p_messaging_profile_information'`,
  }),

  companyType: Joi.string().valid('private', 'public', 'nonprofit', 'government', 'other').required().messages({
    'string.base': `"companyType" should be a type of 'string'`,
    'any.required': `"companyType" is a required field`,
    'string.valid': `"companyType" must be one of 'private', 'public', 'nonprofit', 'government', or 'other'`,
  }),

  stockExchange: Joi.string().optional().allow(null).when('companyType', { is: 'public', then: Joi.required() }).messages({
    'string.base': `"stockExchange" should be a type of 'string'`,
    'any.required': `"stockExchange" is required when "companyType" is "public"`,
  }),

  stockTicker: Joi.string().optional().allow(null).when('companyType', { is: 'public', then: Joi.required() }).messages({
    'string.base': `"stockTicker" should be a type of 'string'`,
    'any.required': `"stockTicker" is required when "companyType" is "public"`,
  }),

  brandContactEmail: Joi.string().email().required().messages({
    'string.base': `"brandContactEmail" should be a type of 'string'`,
    'string.email': `"brandContactEmail" should be a valid email address`,
    'any.required': `"brandContactEmail" is a required field`,
  }),

  companyWebsite: Joi.string().uri().optional().allow(null).messages({
    'string.base': `"companyWebsite" should be a type of 'string'`,
    'string.uri': `"companyWebsite" should be a valid URL`,
  }),

  industry: Joi.string().optional().allow(null).messages({
    'string.base': `"industry" should be a type of 'string'`,
  }),

  description: Joi.string().optional().allow(null).messages({
    'string.base': `"description" should be a type of 'string'`,
  }),

  status: Joi.string().valid('draft', 'pending-review', 'in-review', 'approved', 'rejected', 'expired').optional().default('draft').messages({
    'string.base': `"status" should be a type of 'string'`,
    'string.valid': `"status" must be one of 'draft', 'pending-review', 'in-review', 'approved', 'rejected', 'expired'`,
  }),

  validationErrors: Joi.object().optional().allow(null).messages({
    'object.base': `"validationErrors" should be a type of 'object'`,
  }),

  attachedAt: Joi.date().optional().allow(null).messages({
    'date.base': `"attachedAt" should be a valid date`,
  }),

  entityAssignmentSid: Joi.string().optional().allow(null).messages({
    'string.base': `"entityAssignmentSid" should be a type of 'string'`,
  }),

  attributes: Joi.object().optional().allow(null).messages({
    'object.base': `"attributes" should be a type of 'object'`,
  }),

  twilioResponse: Joi.object().optional().allow(null).messages({
    'object.base': `"twilioResponse" should be a type of 'object'`,
  }),

  validationHistory: Joi.array().items(Joi.object()).optional().default([]).messages({
    'array.base': `"validationHistory" should be an array of objects`,
  }),
};

/**
 * Dynamically forbid specified fields
 */
forbiddenFields.forEach((field) => {
  baseSchema[field] = Joi.forbidden();
});

/**
 * Create A2P EndUser schema
 */
export const createA2PEndUserSchema = Joi.object(baseSchema);

/**
 * Update A2P EndUser schema (.fork makes all fields optional)
 */
export const updateA2PEndUserSchema = createA2PEndUserSchema.fork(
  Object.keys(baseSchema).filter((k) => !forbiddenFields.includes(k)),
  (schema) => schema.optional()
);

