
import Joi from 'joi';

/**
 * Joi schema to validate the creation of a message_log.
 */
export const create_message_log_schema = Joi.object({
  business_id: Joi.string().optional(), // Reference to the Business (optional)
  sales_clerk_id: Joi.string().optional(), // Reference to the SalesClerk (optional)
  conversation_sid: Joi.string().optional(), // Twilio conversation SID
  message_sid: Joi.string().required(), // Unique Twilio message SID
  occurred_at_utc: Joi.date().optional(), // UTC timestamp of when the message occurred
  message_type: Joi.string().default('twilio_sms'), // Default message type is 'twilio_sms'
  date_sent: Joi.date().optional(), // Date the message was sent
  timestamp: Joi.date().default(Date.now), // Auto-generated timestamp when the log was created
});

/**
 * Joi schema to validate the update of a message_log.
 */
export const update_message_log_schema = create_message_log_schema.fork(
  Object.keys(create_message_log_schema.describe().keys).filter(key => key !== 'message_sid'),
  schema => schema.optional()
);
