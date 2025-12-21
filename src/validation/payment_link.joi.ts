import Joi from "joi";

/**
 * Joi schema for creating a PaymentLink.
 * Validates the required fields when creating a new payment link.
 */
const createPaymentLinkValidationSchema = {
  payment_link_id: Joi.string().required(),
  amount: Joi.number().precision(2).required(),
  clerk_id: Joi.string().required(),
  customer_id: Joi.string().required(),
  business_id: Joi.string().optional(),
  order_id: Joi.string().optional(),
  order_description: Joi.string().optional(),
  session_id: Joi.string().optional(),
  gateway: Joi.string().default("slimcd"),
  status: Joi.string().valid("pending", "paid", "expired", "cancelled").default("pending"),
  payment_link_url: Joi.string().required(),
  has_unread: Joi.boolean().optional(),
};

/**
 * Joi schema for updating a PaymentLink.
 * Uses `.fork()` to make fields optional, and dynamically removes forbidden fields.
 */
const forbiddenFields: string[] = ["payment_link_id",]; // Fields that cannot be updated

/**
 * Update schema for PaymentLink.
 * Excludes forbidden fields from the update validation.
 */
const updatePaymentLinkValidationSchema = Joi.object(createPaymentLinkValidationSchema)
  .fork(
    Object.keys(createPaymentLinkValidationSchema).filter(
      (key) => !forbiddenFields.includes(key)
    ),
    (schema) => schema.optional()
  )
  .fork(forbiddenFields, (schema) => schema.forbidden());

export { createPaymentLinkValidationSchema, updatePaymentLinkValidationSchema };

