// validations/superAdmin.joi.ts

import Joi from 'joi';

/**
 * Joi validation schema for creating a new SuperAdmin record.
 * This schema validates the data required to create a SuperAdmin entry, ensuring that
 * all necessary fields are provided and formatted correctly.
 * 
 * @constant createSuperAdminSchema
 */
export const createSuperAdminSchema = Joi.object({
  user_id: Joi.string().required(),
  status: Joi.string().valid('Active', 'Inactive').default('Active'),
});

/**
 * Joi validation schema for updating an existing SuperAdmin record.
 * Makes all fields optional except for the forbidden fields (`created_at`, `updated_at`, `deleted_at`).
 * 
 * @constant updateSuperAdminSchema
 */
export const updateSuperAdminSchema = createSuperAdminSchema.fork(
  Object.keys(createSuperAdminSchema.describe().keys),
  (schema) => schema.optional()
);

