
import Joi, { type Schema } from "joi";

/**
 * Forbidden fields for API requests
 */
const forbiddenFields: string[] = [];

/**
 * Base Joi schema for Address
 */
const baseSchema: { [key: string]: Schema } = {
  business_id: Joi.string().required(),
  address_sid: Joi.string().required().pattern(/^AD[0-9a-fA-F]{32}$/),
  customer_profile_id: Joi.string().optional(),
  customer_name: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  region: Joi.string().required(),
  postal_code: Joi.string().required(),
  street_secondary: Joi.string().optional(),
  iso_country: Joi.string().length(2).default("US"),
  friendly_name: Joi.string().optional(),
  auto_correct_address: Joi.boolean().default(true),
  verified: Joi.boolean().default(false),
  emergency_enabled: Joi.boolean().default(false),
  validation_errors: Joi.object().optional(),
  address_type: Joi.string().valid("business", "residential", "po_box").default("business"),
  status: Joi.string().valid("active", "inactive", "error").default("active"),
  twilio_response: Joi.object().optional(),
  errors: Joi.object().optional(),
};

/**
 * Dynamically forbid specified fields
 */
forbiddenFields.forEach((field) => {
  baseSchema[field] = Joi.forbidden();
});

/**
 * Create Address schema
 */
export const createAddressSchema = Joi.object(baseSchema);

/**
 * Update Address schema (.fork makes all fields optional)
 */
export const updateAddressSchema = createAddressSchema.fork(
  Object.keys(baseSchema).filter((k) => !forbiddenFields.includes(k)),
  (schema) => schema.optional()
);
