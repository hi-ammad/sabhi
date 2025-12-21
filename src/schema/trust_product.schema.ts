// schemas/trustProduct.schema.ts

import type { ITrustProduct } from '@/type';
import { Schema, Types } from 'mongoose';

/**
 * Mongoose Schema for TrustProduct.
 * Represents a TrustProduct record for A2P messaging compliance, containing
 * detailed status, workflow steps, customer profile links, and evaluation data.
 * 
 * @model TrustProduct
 */
const trustProductSchema = new Schema<ITrustProduct>({
  business: { type: Types.ObjectId, required: true, ref: 'Business' },
  trust_product_sid: { type: String, unique: true, match: /^BU[0-9a-fA-F]{32}$/ },
  friendly_name: { type: String, required: true },
  email: { type: String, required: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  policy_sid: { type: String, default: 'RNb0d4771c2c98518d916a3d4cd70a8f8b', required: true },
  status: {
    type: String,
    enum: ['draft', 'pending-review', 'in-review', 'twilio-approved', 'twilio-rejected'],
    default: 'draft',
  },
  status_callback: { type: String, match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/ },
  valid_until: { type: Date },
  current_step: {
    type: String,
    enum: ['creation', 'messaging_info', 'enduser_attach', 'profile_attach', 'evaluation', 'submission'],
    default: 'creation',
  },
  steps_completed: { type: [String], default: [] },
  customer_profile_sid: { type: String },
  customer_profile: { type: Types.ObjectId },
  messaging_profile_end_user_sid: { type: String },
  evaluation_status: {
    type: String,
    enum: ['not_evaluated', 'compliant', 'noncompliant', 'pending_evaluation', 'evaluation_failed'],
    default: 'not_evaluated',
  },
  evaluation_sid: { type: String },
  evaluation_results: { type: Schema.Types.Mixed },
  evaluation_errors: { type: Schema.Types.Mixed },
  submitted_at: { type: Date },
  approved_at: { type: Date },
  rejected_at: { type: Date },
  rejection_reason: { type: String },
  twilio_response: { type: Schema.Types.Mixed },
  webhook_events: { type: [Schema.Types.Mixed], default: [] },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export { trustProductSchema };

