import { Schema, } from "mongoose";
import { IAddress } from "@/type/";
const addressSchema = new Schema<IAddress>(
  {
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    address: {
      type: String,
      unique: true,
      required: true,
      match: /^AD[0-9a-fA-F]{32}$/, // Twilio Address SID validation
    },
    customer_profile: { type: Schema.Types.ObjectId, ref: "CustomerProfile", default: null },
    customer_name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    postal_code: { type: String, required: true },
    street_secondary: { type: String, default: null },
    iso_country: { type: String, required: true, default: "US", maxlength: 2 },
    friendly_name: { type: String, default: null },
    auto_correct_address: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    emergency_enabled: { type: Boolean, default: false },
    validation_errors: { type: Schema.Types.Mixed, default: null },
    address_type: {
      type: String,
      enum: ["business", "residential", "po_box"],
      default: "business",
    },
    status: { type: String, enum: ["active", "inactive", "error"], default: "active" },
    twilio_response: { type: Schema.Types.Mixed, default: null },
    errors_messages: { type: Schema.Types.Mixed, default: null },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id; // hide _id
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id; // hide _id
        return ret;
      },
    },
  }
);

export { addressSchema };
