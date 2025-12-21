import type { IMessagingService } from "@/type";
import { Schema, Types } from "mongoose";

const messagingServiceSchema = new Schema<IMessagingService>(
  {
    business: {
      type: Types.ObjectId,
      ref: "Business",
      required: true,
    },

    messaging_service: {
      type: Types.ObjectId,
      ref: "MessagingService",
      required: false,
    },

    friendly_name: {
      type: String,
      required: true,
    },

    use_case: {
      type: String,
      required: true,
      enum: ["MIXED", "TRANSACTIONAL", "PROMOTIONAL"],
      default: "MIXED",
    },

    description: {
      type: String,
      required: false,
    },

    inbound_request_url: {
      type: String,
      required: false,
    },

    inbound_method: {
      type: String,
      enum: ["GET", "POST"],
      default: "POST",
    },

    fallback_url: {
      type: String,
      required: false,
    },

    fallback_method: {
      type: String,
      enum: ["GET", "POST"],
      default: "POST",
    },

    status_callback_url: {
      type: String,
      required: false,
    },

    sticky_sender: {
      type: Boolean,
      default: true,
    },

    mms_converter: {
      type: Boolean,
      default: true,
    },

    smart_encoding: {
      type: Boolean,
      default: true,
    },

    scan_message_content: {
      type: String,
      enum: ["inherit", "enable", "disable"],
      default: "inherit",
    },

    fallback_to_long_code: {
      type: Boolean,
      default: true,
    },

    area_code_geomatch: {
      type: Boolean,
      default: true,
    },

    validity_period: {
      type: Number,
      default: 14400,
    },

    synchronous_validation: {
      type: Boolean,
      default: true,
    },

    campaign_sids: {
      type: [String],
      default: [],
    },

    phone_number_count: {
      type: Number,
      default: 0,
    },

    phone_number_sids: {
      type: [String],
      default: [],
    },

    monthly_message_count: {
      type: Number,
      default: 0,
    },

    total_message_count: {
      type: Number,
      default: 0,
    },

    last_message_at: {
      type: Date,
      required: false,
    },

    status: {
      type: String,
      enum: ["draft", "active", "suspended", "inactive"],
      default: "draft",
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    use_inbound_webhook_on_number: {
      type: Boolean,
      default: false,
    },

    twilio_response: {
      type: Schema.Types.Mixed,
      required: false,
    },

    activated_at: {
      type: Date,
      required: false,
    },

    suspended_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export { messagingServiceSchema };
