
import Joi from 'joi';

/**
 * Joi schema to validate the creation of a Business Usage record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const createBusinessUsageSchema = Joi.object({
  business_id: Joi.string().required(), // Expecting a string for ObjectId
  monthly_limit: Joi.number().default(1000), // Default monthly limit
  current_count: Joi.number().default(0), // Default current count
  last_reset: Joi.date().required() // Required last reset date
});

/**
 * Joi schema to validate the update of a Business Usage record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const updateBusinessUsageSchema = createBusinessUsageSchema.fork(
  Object.keys(createBusinessUsageSchema.describe().keys).filter(key => key !== 'business_id'),
  schema => schema.optional()
);
