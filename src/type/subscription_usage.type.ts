// interfaces/subscription_usage.interface.ts

import { Document, Types } from 'mongoose';

/**
 * Interface representing a SubscriptionUsage document in MongoDB.
 * This document stores information about usage statistics for a subscription.
 * 
 * @interface ISubscriptionUsage
 * @property {number} messages - The number of messages used in the subscription
 * @property {number} sms - The number of SMS messages used in the subscription
 * @property {number} whatsapp - The number of WhatsApp messages used in the subscription
 * @property {number} facebook - The number of Facebook messages used in the subscription
 * @property {number} seats - The number of seats (users) in the subscription
 * @property {number} phone_numbers - The number of phone numbers in the subscription
 * @property {number} payment_links - The number of payment links in the subscription
 * @property {Types.ObjectId} user - The reference to the User associated with the subscription usage
 * @property {Types.ObjectId} business_subscription - The reference to the business_subscription associated with the subscription usage
 * @property {Types.ObjectId} subscription_id - The reference to the Subscription associated with the usage
 * @property {Date} created_at - Timestamp when the document was created
 * @property {Date} updated_at - Timestamp of the last update to the document
 */
export interface ISubscriptionUsage extends Document {
  messages: number;
  sms: number;
  whatsapp: number;
  facebook: number;
  seats: number;
  phone_numbers: number;
  payment_links: number;
  user: Types.ObjectId;
  business_subscription: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

