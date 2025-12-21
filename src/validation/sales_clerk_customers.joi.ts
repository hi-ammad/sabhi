// validations/sales_clerk_customers.joi.ts

import Joi from 'joi';

// Forbidden fields for update (fields that cannot be updated directly)
const forbiddenFields: string[] = ['created_at', 'updated_at', 'deleted_at'];

/**
 * Joi validation schema for creating a new SalesClerkCustomer.
 * 
 * This schema validates the data required to create a new SalesClerkCustomer record,
 * ensuring that all necessary fields are provided and in the correct format.
 * 
 * @constant createSalesClerkCustomerSchema
 */
export const createSalesClerkCustomerSchema = Joi.object({
  sales_clerk_id: Joi.string().required(),
  customer_id: Joi.string().required(),
  conversation_sid: Joi.string().optional(),
  whatsapp_sid: Joi.string().optional(),
  sms_sid: Joi.string().optional(),
  facebook_sid: Joi.string().optional(),
  business_id: Joi.string().required(),
  resolved: Joi.boolean().optional(),
  channel_type: Joi.string()
    .valid('conversation', 'sms', 'whatsapp', 'facebook')
    .default('conversation'),
  phone_number: Joi.string().optional(),
  customer_phone_number: Joi.string().optional(),
  clerk_phone_number: Joi.string().optional(),
  facebook_user_id: Joi.string().optional(),
});

/**
 * Joi validation schema for updating a SalesClerkCustomer.
 * 
 * Uses `.fork()` to make all fields optional except the forbidden fields (`created_at`, `updated_at`, `deleted_at`).
 * 
 * @constant updateSalesClerkCustomerSchema
 */
export const updateSalesClerkCustomerSchema = createSalesClerkCustomerSchema.fork(
  // Excluding the forbidden fields from update schema
  Object.keys(createSalesClerkCustomerSchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);

