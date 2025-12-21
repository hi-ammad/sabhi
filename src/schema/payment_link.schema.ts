import type { IPaymentLink } from "@/type";
import { Schema } from "mongoose";

/**
 * Mongoose schema for the PaymentLink model.
 * Maps the structure of a payment link document to MongoDB.
 */
const paymentLinkSchema = new Schema<IPaymentLink>({
  payment_link_id: { type: String, required: true, unique: true },
  amount: { type: Schema.Types.Decimal128, required: true },
  clerk_id: { type: Schema.Types.ObjectId, ref: "SalesClerk", required: true },
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  business_id: { type: Schema.Types.ObjectId, ref: "Business", required: false },
  order_id: { type: String, required: false },
  order_description: { type: String, required: false },
  session_id: { type: String, required: false },
  gateway: { type: String, required: false, default: "slimcd" },
  status: {
    type: String,
    enum: ["pending", "paid", "expired", "cancelled"],
    default: "pending",
  },
  payment_link_url: { type: String, required: true, unique: true },
  has_unread: { type: Boolean, required: false },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  versionKey: false, // removes __v version key
});

export { paymentLinkSchema };
