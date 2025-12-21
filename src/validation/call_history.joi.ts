import Joi from 'joi';

/**
 * Joi schema to validate the creation of a Conversation record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const createConversationSchema = Joi.object({
  conversation_sid: Joi.string().required(), // Twilio Conversation SID
  customer_id: Joi.string().required(), // Customer ObjectId (MongoDB)
  sales_clerk_id: Joi.string().required(), // SalesClerk ObjectId (MongoDB)
  business_id: Joi.string().required() // Business ObjectId (MongoDB)
});

/**
 * Joi schema to validate the update of a Conversation record.
 * 
 * @param {Object} value - The object to validate.
 * @returns {Object} - The validation result, including an error object if validation fails.
 */
export const updateConversationSchema = createConversationSchema.fork(
  Object.keys(createConversationSchema.describe().keys).filter(key => key !== 'conversation_sid'),
  schema => schema.optional()
);
