
import Joi from "joi";

/**
 * Brand creation validation schema
 */
export const createBrandSchema = Joi.object({
  business_id: Joi.string().required(),
  brand_sid: Joi.string().pattern(/^BN[0-9a-fA-F]{32}$/).required(),
  friendly_name: Joi.string().required(),
  legal_name: Joi.string().required(),
  dba_name: Joi.string().optional(),
  business_type: Joi.string().valid("Sole Proprietorship", "Partnership", "Corporation", "LLC", "Non-Profit", "Government", "Other").required(),
  industry: Joi.string().required(),
  ein: Joi.string().optional(),
  tax_id_type: Joi.string().valid("EIN", "SSN").optional(),
  tax_id: Joi.string().optional(),
  registration_number: Joi.string().optional(),
  registration_country: Joi.string().default("US").required(),
  registration_state: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  street: Joi.string().required(),
  street2: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postal_code: Joi.string().required(),
  country: Joi.string().default("US").required(),
  status: Joi.string().valid("draft", "pending", "in_review", "approved", "rejected", "suspended", "expired").default("draft"),
  brand_type: Joi.string().valid("standard", "sole_proprietor", "starter", "low_volume", "high_volume").default("standard"),
  skip_automatic_sec_vet: Joi.boolean().default(false),
  description: Joi.string().optional(),
  stock_symbol: Joi.string().optional(),
  stock_exchange: Joi.string().optional(),
  ip_address: Joi.string().optional(),
});

/**
 * Brand update validation schema (all fields optional)
 */
export const updateBrandSchema = createBrandSchema.fork(Object.keys(createBrandSchema.describe().keys), schema => schema.optional());
