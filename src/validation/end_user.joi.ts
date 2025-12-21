// src/validations/endUserValidation.ts

import Joi from 'joi';

/**
 * Joi schema to validate the creation of an EndUser record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const createEndUserSchema = Joi.object({
  end_user_sid: Joi.string().allow(null), // Twilio EndUser SID (optional)
  friendly_name: Joi.string().required(), // Friendly name
  type: Joi.string().valid(
    'customer_profile_business_information',
    'authorized_representative_1',
    'authorized_representative_2',
    'us_a2p_messaging_profile_information'
  ).required(),
  business_name: Joi.string().allow(null), // Business name (optional)
  business_type: Joi.string().valid(
    'Partnership',
    'Corporation',
    'LLC',
    'Sole Proprietorship',
    'Non-Profit',
    'Government'
  ).allow(null),
  business_identity: Joi.string().valid('direct_customer', 'isv_reseller_embedded_software').allow(null),
  business_industry: Joi.string().allow(null),
  business_registration_identifier: Joi.string().valid('EIN', 'SSN').allow(null),
  business_registration_number: Joi.string().allow(null),
  business_regions_of_operation: Joi.string().default('USA_AND_CANADA'),
  website_url: Joi.string().allow(null),
  social_media_profile_urls: Joi.string().allow(null),
  first_name: Joi.string().allow(null),
  last_name: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  phone_number: Joi.string().allow(null),
  job_position: Joi.string().allow(null),
  business_title: Joi.string().allow(null),
  company_type: Joi.string().valid('private', 'public', 'nonprofit').allow(null),
  stock_exchange: Joi.string().allow(null),
  stock_ticker: Joi.string().allow(null),
  brand_contact_email: Joi.string().email().allow(null),
  status: Joi.string().valid('draft', 'pending_review', 'approved', 'rejected').default('draft'),
  entity_assignment_sid: Joi.string().allow(null),
  assigned_at: Joi.date().allow(null),
  additional_attributes: Joi.object().allow(null),
});

/**
 * Joi schema to validate the update of an EndUser record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const updateEndUserSchema = createEndUserSchema.fork(
  Object.keys(createEndUserSchema.describe().keys).filter(key => key !== 'end_user_sid'),
  schema => schema.optional()
);
