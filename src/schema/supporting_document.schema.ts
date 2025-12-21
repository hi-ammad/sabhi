// schemas/supportingDocument.schema.ts

import type { ISupportingDocument } from '@/type';
import { Schema, Types } from 'mongoose';

const supportingDocumentSchema = new Schema<ISupportingDocument>({
  business_id: { type: Types.ObjectId, required: true, ref: 'Business' },
  supporting_document_sid: { type: String, unique: true, match: /^RD[0-9a-fA-F]{32}$/ },
  customer_profile_id: { type: Types.ObjectId, ref: 'CustomerProfile', required: false },
  friendly_name: { type: String, required: true },
  type: { type: String, required: true },
  attributes: { type: Schema.Types.Mixed, required: true },
  document_category: {
    type: String,
    enum: ['business_license', 'tax_document', 'utility_bill', 'bank_statement', 'articles_of_incorporation', 'government_id', 'other'],
    required: true,
  },
  file_name: { type: String },
  file_size: { type: Number },
  mime_type: { type: String },
  file_url: { type: String },
  status: {
    type: String,
    enum: ['DRAFT', 'PENDING_REVIEW', 'PROVISIONALLY_APPROVED', 'APPROVED', 'REJECTED', 'EXPIRED'],
    default: 'DRAFT',
    required: true,
  },
  verified: { type: Boolean, default: false },
  expiration_date: { type: Date },
  is_expired: { type: Boolean, default: false },
  review_notes: { type: String },
  rejection_reason: { type: String },
  validation_errors: { type: Schema.Types.Mixed },
  is_confidential: { type: Boolean, default: true },
  access_level: {
    type: String,
    enum: ['business_admin', 'compliance_officer', 'system'],
    default: 'business_admin',
  },
  twilio_response: { type: Schema.Types.Mixed },
  errors_messages: { type: Schema.Types.Mixed },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false, // Removes the __v field
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  deleted_at: { type: Date, default: null },
});

// You can define any associations here if needed

export { supportingDocumentSchema };

