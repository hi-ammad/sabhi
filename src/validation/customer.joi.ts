
import { EUserStatus } from "@/enum";
import Joi from "joi";
import type { Schema } from "joi";
/**
 * Forbidden fields for API requests
 */
const forbiddenFields: string[] = [];

/**
 * Base Joi schema for Customer
 */
const baseSchema: { [key: string]: Schema } = {
  user_id: Joi.string().required(), // MongoDB ObjectId as string
  status: Joi.string().valid(...Object.values(EUserStatus)).optional(),
  assigned_sales_clerk: Joi.string().optional(),
  business_id: Joi.string().optional(),
};

// Mark forbidden fields (none in this case, but keeps pattern consistent)
forbiddenFields.forEach((field) => {
  baseSchema[field] = Joi.forbidden();
});

/**
 * Create Customer schema
 */
export const createCustomerSchema = Joi.object(baseSchema);

/**
 * Update Customer schema (.fork makes all optional)
 */
export const updateCustomerSchema = createCustomerSchema.fork(
  Object.keys(baseSchema).filter((k) => !forbiddenFields.includes(k)),
  (schema) => schema.optional()
);
