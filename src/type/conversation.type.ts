import { Types } from 'mongoose';

/**
 * @interface IConversation
 * Represents the conversation document in MongoDB.
 * 
 * @property {string} conversation_sid - The unique SID for the conversation (e.g., from Twilio).
 * @property {Types.ObjectId[]} users - The list of users participating in the conversation (MongoDB ObjectIds).
 * @property {Types.ObjectId} customer_id - The associated customer for the conversation (MongoDB ObjectId).
 * @property {Types.ObjectId} sales_clerk_id - The associated sales clerk for the conversation (MongoDB ObjectId).
 * @property {Types.ObjectId} business_id - The associated business for the conversation (MongoDB ObjectId).
 * @property {Date} created_at - The timestamp when the conversation was created.
 * @property {Date} updated_at - The timestamp when the conversation was last updated.
 */
export interface IConversation {
  conversation_sid: string;
  customer_id: Types.ObjectId; // Reference to the Customer model
  sales_clerk_id: Types.ObjectId; // Reference to the SalesClerk model
  business_id: Types.ObjectId; // Reference to the Business model
  created_at: Date;
  updated_at: Date;
}

