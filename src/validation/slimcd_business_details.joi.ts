// validations/slimcd_business_details.joi.ts

import Joi from 'joi';

/**
 * Joi validation schema for creating a new SlimcdBusinessDetails.
 * This schema ensures that the provided data is in the correct format 
 * for creating a new SlimcdBusinessDetails record.
 * 
 * @constant createSlimcdBusinessDetailsSchema
 * @example 
 * // Example payload for creating a SlimcdBusinessDetails record
 * {
 *   "business_id": "603d9c6878c3b88b2b6db1a1",
 *   "username": "slimcduser",
 *   "site_id": "site1234",
 *   "client_id": 12345,
 *   "form_id": 1001,
 *   "price_id": 2002
 * }
 */
export const createSlimcdBusinessDetailsSchema = Joi.object({
  business_id: Joi.string().required(),
  username: Joi.string().required(),
  site_id: Joi.string().required(),
  client_id: Joi.number().required(),
  form_id: Joi.number().required(),
  price_id: Joi.number().required(),
});

/**
 * Joi validation schema for updating an existing SlimcdBusinessDetails.
 * This schema makes all fields optional except for the forbidden ones 
 * (`created_at`, `updated_at`), which are immutable.
 * 
 * @constant updateSlimcdBusinessDetailsSchema
 * @example 
 * // Example payload for updating a SlimcdBusinessDetails record
 * {
 *   "username": "updatedslimcduser",
 *   "price_id": 2003
 * }
 */
export const updateSlimcdBusinessDetailsSchema = createSlimcdBusinessDetailsSchema.fork(
  // Excluding the forbidden fields from the update schema
  Object.keys(createSlimcdBusinessDetailsSchema.describe().keys),
  (schema) => schema.optional()
);
