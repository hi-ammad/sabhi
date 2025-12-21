import { Types } from 'mongoose';

/**
 * @interface IMessageLog
 * Represents a message log record in the system.
 *
 * @property {Types.ObjectId} business_id - Reference to the associated business.
 * @property {Types.ObjectId} sales_clerk_id - Reference to the sales clerk who handled the message.
 * @property {string} conversation_sid - The unique Twilio conversation SID.
 * @property {string} message_sid - The unique SID for the message (e.g., Twilio SMS SID).
 * @property {Date} occurred_at_utc - UTC timestamp of when the message occurred.
 * @property {string} message_type - Type of the message (default is 'twilio_sms').
 * @property {Date} date_sent - The date the message was sent (in YYYY-MM-DD format).
 * @property {Date} timestamp - The exact timestamp when the message log was created (auto-generated).
 */
export interface IMessageLog {
  business_id: Types.ObjectId;
  sales_clerk_id: Types.ObjectId;
  conversation_sid: string;
  message_sid: string;
  occurred_at_utc: Date;
  message_type: string;
  date_sent: Date;
  timestamp: Date;
}
