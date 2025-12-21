
// src/models/endUserModel.ts

// import type { IEndUser } from '@/type';
import { Schema } from 'mongoose';

/**
 * Mongoose schema for the EndUser model.
 * Defines the structure of the EndUser collection in MongoDB.
 * 
 * @param {IEndUser} IEndUser - Interface representing the document structure.
 */
const endUserSchema = new Schema(
  {
    end_user_sid: { type: String, default: null },
    friendly_name: { type: String, required: true },
    type: {
      type: String,
      enum: ['customer_profile_business_information', 'authorized_representative_1', 'authorized_representative_2', 'us_a2p_messaging_profile_information'],
      required: true,
      default: 'customer_profile_business_information'
    },
    business_name: { type: String, default: null },
    business_type: { type: String, enum: ['Partnership', 'Corporation', 'LLC', 'Sole Proprietorship', 'Non-Profit', 'Government'], default: null },
    business_identity: { type: String, enum: ['direct_customer', 'isv_reseller_embedded_software'], default: 'direct_customer' },
    business_industry: { type: String, default: null },
    business_registration_identifier: { type: String, enum: ['EIN', 'SSN'], default: null },
    business_registration_number: { type: String, default: null },
    business_regions_of_operation: { type: String, default: 'USA_AND_CANADA' },
    website_url: { type: String, default: null },
    social_media_profile_urls: { type: String, default: null },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, default: null },
    phone_number: { type: String, default: null },
    job_position: { type: String, default: null },
    business_title: { type: String, default: null },
    company_type: { type: String, enum: ['private', 'public', 'nonprofit'], default: null },
    stock_exchange: { type: String, default: null },
    stock_ticker: { type: String, default: null },
    brand_contact_email: { type: String, default: null },
    status: {
      type: String,
      enum: ['draft', 'pending_review', 'approved', 'rejected'],
      default: 'draft'
    },
    entity_assignment_sid: { type: String, default: null },
    assigned_at: { type: Date, default: null },
    additional_attributes: { type: Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true, // Automatically adds created_at and updated_at fields
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } },
    toObject: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } }
  }
);

export { endUserSchema };
