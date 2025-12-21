import type { ISalesClerkCustomer } from '@/type';
import { Schema, Types } from 'mongoose';

/**
 * Mongoose Schema for SalesClerkCustomer.
 * 
 * This schema represents the linking of a SalesClerk to a Customer with communication 
 * channel-specific metadata (e.g., conversationSid, whatsappSid, smsSid, etc.). 
 * It supports soft deletes with the `paranoid` option and provides timestamps for `created_at` and `updated_at`.
 * 
 * @model SalesClerkCustomer
 */
const salesClerkCustomerSchema = new Schema<ISalesClerkCustomer>({
  sales_clerk_id: { type: Types.ObjectId, required: true, ref: 'SalesClerk' },
  customer_id: { type: Types.ObjectId, required: true, ref: 'Customer' },
  conversation_sid: { type: String, required: false },
  whatsapp_sid: { type: String, required: false },
  sms_sid: { type: String, required: false },
  facebook_sid: { type: String, required: false },
  business_id: { type: Types.ObjectId, required: true, ref: 'Business' },
  resolved: { type: Boolean, default: false },
  channel_type: {
    type: String,
    enum: ['conversation', 'sms', 'whatsapp', 'facebook'],
    default: 'conversation',
    required: true
  },
  phone_number: { type: String, required: false },
  customer_phone_number: { type: String, required: false },
  clerk_phone_number: { type: String, required: false },
  facebook_user_id: { type: String, required: false },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,  // Removes the __v field
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export { salesClerkCustomerSchema };
