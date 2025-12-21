import Joi from 'joi';

/**
 * Joi validation schema for creating a new SupportingDocument record.
 * This schema validates the required fields to create a new SupportingDocument entry.
 * 
 * @constant createSupportingDocumentSchema
 */
export const createSupportingDocumentSchema = Joi.object({
  business_id: Joi.string().required(),
  supporting_document_sid: Joi.string().optional().pattern(/^RD[0-9a-fA-F]{32}$/),
  customer_profile_id: Joi.string().optional(),
  friendly_name: Joi.string().required(),
  type: Joi.string().required(),
  attributes: Joi.object().required(),
  document_category: Joi.string().valid(
    'business_license',
    'tax_document',
    'utility_bill',
    'bank_statement',
    'articles_of_incorporation',
    'government_id',
    'other'
  ).required(),
  file_name: Joi.string().optional(),
  file_size: Joi.number().optional(),
  mime_type: Joi.string().optional(),
  file_url: Joi.string().optional(),
  status: Joi.string().valid(
    'DRAFT',
    'PENDING_REVIEW',
    'PROVISIONALLY_APPROVED',
    'APPROVED',
    'REJECTED',
    'EXPIRED'
  ).default('DRAFT'),
  verified: Joi.boolean().default(false),
  expiration_date: Joi.date().optional(),
  is_expired: Joi.boolean().default(false),
  review_notes: Joi.string().optional(),
  rejection_reason: Joi.string().optional(),
  validation_errors: Joi.object().optional(),
  is_confidential: Joi.boolean().default(true),
  access_level: Joi.string().valid('business_admin', 'compliance_officer', 'system').default('business_admin'),
  twilio_response: Joi.object().optional(),
  errors: Joi.object().optional(),
});

/**
 * Joi validation schema for updating an existing SupportingDocument.
 * 
 * Makes all fields optional except the forbidden fields (`created_at`, `updated_at`, `deleted_at`).
 * 
 * @constant updateSupportingDocumentSchema
 */
export const updateSupportingDocumentSchema = createSupportingDocumentSchema.fork(
  Object.keys(createSupportingDocumentSchema.describe().keys),
  (schema) => schema.optional()
);

