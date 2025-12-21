import { EUserRole } from '@/enum';
import Joi from 'joi';

/**
 * Forbidden fields for update (fields that cannot be updated directly)
 */
const forbiddenFields: string[] = ['created_at', 'updated_at', 'deleted_at'];

/**
 * Joi validation schema for creating a new User.
 * This schema ensures that all necessary fields are provided and properly validated
 * for creating a user account.
 * 
 * @constant createUserSchema
 */
export const createUserJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(...Object.values(EUserRole)).required(),
  status: Joi.string().valid("active", "inactive").optional(),
  business: Joi.when("role", {
    is: Joi.valid(EUserRole.CLERK, EUserRole.CUSTOMER),
    then: Joi.string().hex().length(24).required(),
    otherwise: Joi.forbidden(),  // raises an error if provided
  }),
  assignedClerks: Joi.when("role", {
    is: EUserRole.CUSTOMER,   // replace with actual enum value
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),  // raises an error if provided
  }),
  channelType: Joi.string().optional(),
  notRetainedClerk: Joi.boolean().optional(),
});

/**
 * Joi validation schema for updating an existing User.
 * This schema uses `.fork()` to make fields optional except for the forbidden fields.
 * 
 * @constant updateUserSchema
 */
export const updateUserSchema = createUserJoiSchema.fork(
  // Exclude forbidden fields from update schema
  Object.keys(createUserJoiSchema.describe().keys).filter(
    (key) => !forbiddenFields.includes(key)
  ),
  (schema) => schema.optional()
);

