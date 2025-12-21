
import Joi from 'joi';

/**
 * Joi schema to validate the creation of a CustomerProfile record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const createCustomerProfileSchema = Joi.object({
  customer_profile_sid: Joi.string().required(), // Twilio CustomerProfile SID (e.g., "BUxxxxxxxxxxxxxxx")
  friendly_name: Joi.string().required(), // Friendly name
  email: Joi.string().email().required(), // Email should be valid
  policy_sid: Joi.string().default('RNdfbf3fae0e1107f8aded0e7cead80bf5'), // Default Policy SID
  status_callback: Joi.string().allow(null), // Optional webhook URL
  status: Joi.string().valid('draft', 'pending-review', 'in-review', 'twilio-approved', 'twilio-rejected').default('draft'),
  valid_until: Joi.date().allow(null), // Expiration date can be null
  last_evaluation_sid: Joi.string().allow(null), // Last evaluation SID can be null
  last_evaluation_status: Joi.string().valid('compliant', 'noncompliant').allow(null), // Evaluation result can be null
  last_evaluation_results: Joi.object().allow(null), // Evaluation results can be null
  primary_customer_profile_sid: Joi.string().allow(null), // Primary profile SID can be null
  linking_entity_assignment_sid: Joi.string().allow(null), // Entity Assignment SID can be null
  submitted_at: Joi.date().allow(null),
  approved_at: Joi.date().allow(null),
  rejected_at: Joi.date().allow(null),
  errors: Joi.object().allow(null)
});

/**
 * Joi schema to validate the update of a CustomerProfile record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const updateCustomerProfileSchema = createCustomerProfileSchema.fork(
  Object.keys(createCustomerProfileSchema.describe().keys).filter(key => key !== 'customer_profile_sid'),
  schema => schema.optional()
);
