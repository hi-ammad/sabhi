import { Document, Types } from "mongoose";

/**
 * Represents a payment link document in MongoDB.
 *
 * @interface IPaymentLink
 * @extends Document
 * 
 * @property {string} payment_link_id - Unique identifier for the payment link.
 * @property {number} amount - The amount to be paid through the payment link.
 * @property {Types.ObjectId} clerk_id - Reference to the sales clerk associated with the payment link.
 * @property {Types.ObjectId} customer_id - Reference to the customer for the payment link.
 * @property {Types.ObjectId} [business_id] - Optional reference to the business.
 * @property {string} [order_id] - Optional reference to the associated order.
 * @property {string} [order_description] - Optional description of the order.
 * @property {string} [session_id] - Optional session ID for the payment link.
 * @property {string} gateway - Payment gateway used for processing the payment. Defaults to "slimcd".
 * @property {"pending" | "paid" | "expired" | "cancelled"} status - The current status of the payment link.
 * @property {string} payment_link_url - The URL for the payment link.
 * @property {boolean} [has_unread] - Optional field indicating whether the payment link has unread notifications.
 * @property {Date} created_at - Timestamp when the payment link was created.
 * @property {Date} updated_at - Timestamp when the payment link was last updated.
 */
export interface IPaymentLink extends Document {
  payment_link_id: string;
  amount: number;
  clerk_id: Types.ObjectId;
  customer_id: Types.ObjectId;
  business_id?: Types.ObjectId;
  order_id?: string;
  order_description?: string;
  session_id?: string;
  gateway: string;
  status: "pending" | "paid" | "expired" | "cancelled";
  payment_link_url: string;
  has_unread?: boolean;
  created_at: Date;
  updated_at: Date;
}

