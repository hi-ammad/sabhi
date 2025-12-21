import { EUserStatus } from "@/enum";
import Joi from "joi";
import type { Schema } from "joi";

/**
 * Fields that should not be allowed in API requests
 */
const forbiddenFields = ["phone", "sms_usage"];

/**
 * Base Joi schema for Business
 * - snake_case property names
 * - dynamic type-safe indexing for forbidden fields
 */
const baseSchema: { [key: string]: Schema } = {
  name: Joi.string().optional(),
  industry: Joi.string().required(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zip_code: Joi.string().optional(),
  status: Joi.string().valid(...Object.values(EUserStatus)).optional(),
  image: Joi.string().optional(),
  facebook_url: Joi.array().items(Joi.string()).optional(),
  description: Joi.string().optional(),
  business_type: Joi.string().optional(),
  operating_hours: Joi.string().optional(),
  preferred_channel: Joi.string().optional(),
  notification_channel: Joi.string().optional(),
  whatsapp: Joi.string().optional(),
  license_number: Joi.string().optional(),
};

/**
 * Dynamically forbid specified fields
 */
forbiddenFields.forEach((field) => {
  baseSchema[field] = Joi.forbidden();
});

/**
 * Joi schema for creating a Business
 */
export const createBusinessSchema = Joi.object(baseSchema);

/**
 * Joi schema for updating a Business
 * - Uses .fork to make all fields optional except forbidden ones
 */
export const updateBusinessSchema = createBusinessSchema.fork(
  Object.keys(baseSchema).filter((k) => !forbiddenFields.includes(k)),
  (schema) => schema.optional()
);
