// schemas/subscription_usage.schema.ts

import type { ISubscriptionUsage } from '@/type/subscription_usage.type';
import { Schema, Types } from 'mongoose';

/**
 * Mongoose Schema for SubscriptionUsage.
 * This schema defines the structure for storing usage statistics for a subscription.
 * The statistics include message counts (SMS, WhatsApp, Facebook), seats, phone numbers, and payment links.
 * 
 * @model SubscriptionUsage
 * @property {number} messages - The number of messages used in the subscription
 * @property {number} sms - The number of SMS messages used in the subscription
 * @property {number} whatsapp - The number of WhatsApp messages used in the subscription
 * @property {number} facebook - The number of Facebook messages used in the subscription
 * @property {number} seats - The number of seats (users) in the subscription
 * @property {number} phone_numbers - The number of phone numbers in the subscription
 * @property {number} payment_links - The number of payment links in the subscription
 * @property {Types.ObjectId} user_id - Reference to the User model
 * @property {Types.ObjectId} subscription_id - Reference to the Subscription model
 * @property {Date} created_at - Timestamp when the document was created
 * @property {Date} updated_at - Timestamp of the last update to the document
 */
const subscriptionUsageSchema = new Schema<ISubscriptionUsage>({
  messages: { type: Number, default: 0 },
  sms: { type: Number, default: 0 },
  whatsapp: { type: Number, default: 0 },
  facebook: { type: Number, default: 0 },
  seats: { type: Number, default: 0 },
  phone_numbers: { type: Number, default: 1 },
  payment_links: { type: Number, default: 0 },
  user: { type: Types.ObjectId, required: true, ref: 'User' },
  business_subscription: { type: Types.ObjectId, required: true, ref: 'Subscription' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,  // Removes the __v field
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export { subscriptionUsageSchema };

