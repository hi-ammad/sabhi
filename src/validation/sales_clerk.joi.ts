import Joi from 'joi';

// Define forbidden fields that should not be updated
const forbiddenFields = ['created_at', 'updated_at', 'deleted_at'];

/**
 * Joi schema for creating a new SalesClerk.
 * This schema validates the input data for creating a sales clerk.
 */
export const createSalesClerkSchema = Joi.object({
  user_id: Joi.string().required(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE'),
  business_id: Joi.string().required(),
  not_retain_on_next_plan: Joi.boolean().default(false),
});

/**
 * Joi schema for updating a SalesClerk.
 * This schema is used for updating the sales clerk document.
 * Uses Joi's `fork()` method to make fields optional and exclude forbidden fields.
 */
export const updateSalesClerkSchema = createSalesClerkSchema.fork(
  // Fields to exclude from the update schema (made optional and forbidden)
  Object.keys(createSalesClerkSchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);

