import Joi from "joi";

/**
 * Joi schema for creating a PhoneNumberAssignment.
 * Validates the required fields when creating a new phone number assignment.
 */
const createPhoneNumberAssignmentValidationSchema = {
  phone_number_sid: Joi.string().required(),
  phone_number: Joi.string().required(),
  friendly_name: Joi.string().optional(),
  number_type: Joi.string().valid("local", "toll-free", "short-code", "mobile").default("local"),
  country_code: Joi.string().length(2).default("US"),
  region: Joi.string().optional(),
  locality: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  area_code: Joi.string().optional(),
  voice_enabled: Joi.boolean().default(false),
  sms_enabled: Joi.boolean().default(true),
  mms_enabled: Joi.boolean().default(true),
  fax_enabled: Joi.boolean().default(false),
  voice_url: Joi.string().optional(),
  voice_method: Joi.string().valid("GET", "POST").default("POST"),
  voice_fallback_url: Joi.string().optional(),
  sms_url: Joi.string().optional(),
  sms_method: Joi.string().valid("GET", "POST").default("POST"),
  sms_fallback_url: Joi.string().optional(),
  status_callback_url: Joi.string().optional(),
  status_callback_method: Joi.string().valid("GET", "POST").default("POST"),
  is_primary: Joi.boolean().default(false),
  is_active: Joi.boolean().default(true),
  purchased_at: Joi.date().optional(),
  released_at: Joi.date().optional(),
};

/**
 * Joi schema for updating a PhoneNumberAssignment.
 * Uses `.fork()` to make fields optional, and dynamically removes forbidden fields.
 */
const forbiddenFields: string[] = ["phone_number_sid"]; // Fields that cannot be updated

/**
 * Update schema for PhoneNumberAssignment.
 * Excludes forbidden fields from the update validation.
 */
const updatePhoneNumberAssignmentValidationSchema = Joi.object(createPhoneNumberAssignmentValidationSchema)
  .fork(
    Object.keys(createPhoneNumberAssignmentValidationSchema).filter(
      (key) => !forbiddenFields.includes(key)
    ),
    (schema) => schema.optional()
  )
  .fork(forbiddenFields, (schema) => schema.forbidden());

export { createPhoneNumberAssignmentValidationSchema, updatePhoneNumberAssignmentValidationSchema };

