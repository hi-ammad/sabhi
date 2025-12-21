import Joi from 'joi';

/**
 * Forbidden fields for update (fields that cannot be updated directly)
 */
const forbiddenFields: string[] = ['created_at', 'updated_at'];

/**
 * Joi validation schema for creating a new User2FA record.
 * Ensures that the necessary fields are provided and in the correct format.
 * 
 * @constant createUser2FASchema
 */
export const createUser2FASchema = Joi.object({
  user_id: Joi.number().integer().required(),
  sms_enabled: Joi.boolean().default(false),
  last_enabled_at: Joi.date().optional(),
  last_disabled_at: Joi.date().optional()
});

/**
 * Joi validation schema for updating an existing User2FA record.
 * Uses `.fork()` to make fields optional except for the forbidden fields.
 * 
 * @constant updateUser2FASchema
 */
export const updateUser2FASchema = createUser2FASchema.fork(
  Object.keys(createUser2FASchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);

