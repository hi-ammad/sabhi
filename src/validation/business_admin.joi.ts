import Joi from "joi";

/**
 * BusinessAdmin creation validation schema
 */
export const createBusinessAdminSchema = Joi.object({
  user: Joi.string().hex().length(24).required(),
  business: Joi.string().hex().length(24).required(),
  status: Joi.string().valid("Active", "Inactive").default("Active")
});

/**
 * BusinessAdmin update validation schema (all fields optional)
 */
export const updateBusinessAdminSchema = createBusinessAdminSchema.fork(
  Object.keys(createBusinessAdminSchema.describe().keys),
  (schema) => schema.optional()
);
