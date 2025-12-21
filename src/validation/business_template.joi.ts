import Joi from 'joi';

/**
 * Joi schema to validate the creation of a Business Template.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const createBusinessTemplateSchema = Joi.object({
  business_id: Joi.string().required(), // Expecting a string for ObjectId
  template_id: Joi.string().required(), // Twilio Content SID
  template_name: Joi.string().optional().allow(null),
  added_by: Joi.string().optional().allow(null), // Reference to the user who added the template
  is_active: Joi.boolean().default(true)
});

/**
 * Joi schema to validate the update of a Business Template.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const updateBusinessTemplateSchema = createBusinessTemplateSchema.fork(
  Object.keys(createBusinessTemplateSchema.describe().keys).filter(key => key !== 'business_id'),
  schema => schema.optional()
);

