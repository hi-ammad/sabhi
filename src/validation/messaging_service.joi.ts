import Joi from "joi";

/**
 * Forbidden fields for API requests.
 * These fields should not be updated by users.
 */
const forbiddenFields: string[] = [
  "messaging_service_sid", // Example: SID should not be updated
  "created_at", // Should not be updated
  "updated_at", // Should not be updated
  "activated_at", // Should not be updated
  "suspended_at", // Should not be updated
];

/**
 * Joi validation schema for creating a Messaging Service.
 * All fields are required for creation except the optional ones.
 */
const createMessagingServiceValidationSchema = {
  business_id: Joi.string().required(),
  messaging_service_sid: Joi.string().optional(),
  friendly_name: Joi.string().required(),
  use_case: Joi.string()
    .valid("MIXED", "TRANSACTIONAL", "PROMOTIONAL")
    .default("MIXED"),
  description: Joi.string().optional(),
  inbound_request_url: Joi.string().optional(),
  inbound_method: Joi.string().valid("GET", "POST").default("POST"),
  fallback_url: Joi.string().optional(),
  fallback_method: Joi.string().valid("GET", "POST").default("POST"),
  status_callback_url: Joi.string().optional(),
  sticky_sender: Joi.boolean().default(true),
  mms_converter: Joi.boolean().default(true),
  smart_encoding: Joi.boolean().default(true),
  scan_message_content: Joi.string().valid("inherit", "enable", "disable").default("inherit"),
  fallback_to_long_code: Joi.boolean().default(true),
  area_code_geomatch: Joi.boolean().default(true),
  validity_period: Joi.number().default(14400),
  synchronous_validation: Joi.boolean().default(true),
  campaign_sids: Joi.array().items(Joi.string()).default([]),
  phone_number_count: Joi.number().default(0),
  phone_number_sids: Joi.array().items(Joi.string()).default([]),
  monthly_message_count: Joi.number().default(0),
  total_message_count: Joi.number().default(0),
  last_message_at: Joi.date().optional(),
  status: Joi.string().valid("draft", "active", "suspended", "inactive").default("draft"),
  is_active: Joi.boolean().default(true),
  use_inbound_webhook_on_number: Joi.boolean().default(false),
  twilio_response: Joi.object().optional(),
  activated_at: Joi.date().optional(),
  suspended_at: Joi.date().optional(),
};

/**
 * Joi validation schema for updating a Messaging Service.
 * Fields are optional, and forbidden fields are excluded using `.fork()` and `.forbidden()`.
 */
const updateMessagingServiceValidationSchema = Joi.object(createMessagingServiceValidationSchema)
  .fork(
    Object.keys(createMessagingServiceValidationSchema).filter(
      (key) => !forbiddenFields.includes(key) // Make all fields optional except forbidden fields
    ),
    (schema) => schema.optional() // Make all fields optional for updates
  )

export { createMessagingServiceValidationSchema, updateMessagingServiceValidationSchema };

