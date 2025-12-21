import { Document, Types } from 'mongoose';

/**
 * Interface representing a SalesClerkCustomer document in the database.
 * 
 * This interface defines the structure of a SalesClerkCustomer document,
 * linking a SalesClerk to a Customer with multiple communication channels.
 * It includes fields like channel IDs (e.g., conversationSid, whatsappSid) and various metadata.
 * 
 * @interface ISalesClerkCustomer
 */
export interface ISalesClerkCustomer extends Document {
  /**
   * The unique identifier for the sales clerk (references SalesClerk model).
   * 
   * @type {Types.ObjectId}
   */
  sales_clerk_id: Types.ObjectId;

  /**
   * The unique identifier for the customer (references Customer model).
   * 
   * @type {Types.ObjectId}
   */
  customer_id: Types.ObjectId;

  /**
   * The SID for the conversation in the Twilio Conversations API.
   * 
   * @type {string}
   * @optional
   */
  conversation_sid?: string;

  /**
   * The SID for the WhatsApp conversation.
   * 
   * @type {string}
   * @optional
   */
  whatsapp_sid?: string;

  /**
   * The SID for SMS communication.
   * 
   * @type {string}
   * @optional
   */
  sms_sid?: string;

  /**
   * The SID for the Facebook conversation.
   * 
   * @type {string}
   * @optional
   */
  facebook_sid?: string;

  /**
   * The unique identifier for the business this record belongs to.
   * 
   * @type {Types.ObjectId}
   */
  business_id: Types.ObjectId;

  /**
   * A flag indicating if the relationship has been resolved.
   * 
   * @type {boolean}
   * @optional
   */
  resolved?: boolean;

  /**
   * The type of communication channel. This could be:
   * - 'conversation'
   * - 'sms'
   * - 'whatsapp'
   * - 'facebook'
   * 
   * @type {string}
   */
  channel_type: 'conversation' | 'sms' | 'whatsapp' | 'facebook';

  /**
   * The phone number for the communication channel.
   * 
   * @type {string}
   * @optional
   */
  phone_number?: string;

  /**
   * The customer's phone number.
   * 
   * @type {string}
   * @optional
   */
  customer_phone_number?: string;

  /**
   * The sales clerk's phone number.
   * 
   * @type {string}
   * @optional
   */
  clerk_phone_number?: string;

  /**
   * The user ID for the Facebook user associated with this conversation.
   * 
   * @type {string}
   * @optional
   */
  facebook_user_id?: string;

  /**
   * The timestamp when the document was deleted, if applicable (soft delete).
   * 
   * @type {Date | null}
   * @optional
   */
  deleted_at?: Date | null;

  /**
   * The timestamp when the document was created.
   * 
   * @type {Date}
   */
  created_at: Date;

  /**
   * The timestamp when the document was last updated.
   * 
   * @type {Date}
   */
  updated_at: Date;
}

