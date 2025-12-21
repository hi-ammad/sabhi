import { Document, Types } from 'mongoose';

/**
 * Interface representing a SupportingDocument document in MongoDB.
 * This document contains information about a supporting document uploaded to the system,
 * including details like document SID, verification status, and other metadata.
 * 
 * @interface ISupportingDocument
 * @property {Types.ObjectId} business_id - Reference to the associated Business.
 * @property {string} supporting_document_sid - Twilio SupportingDocument SID (e.g., "RDxxxxxxxxxxxxxxxxxxxxxx").
 * @property {Types.ObjectId} [customer_profile_id] - Optional reference to CustomerProfile for compliance.
 * @property {string} friendly_name - Human-readable name for the document.
 * @property {string} type - Type of the supporting document as defined by Twilio.
 * @property {Record<string, any>} attributes - Document-specific attributes (varies by document type).
 * @property {string} document_category - Category of the supporting document.
 * @property {string} [file_name] - Original filename of the uploaded document.
 * @property {number} [file_size] - Size of the file in bytes.
 * @property {string} [mime_type] - MIME type of the document.
 * @property {string} [file_url] - Twilio-hosted file URL.
 * @property {string} status - Current status of the document (DRAFT, PENDING_REVIEW, etc.).
 * @property {boolean} verified - Whether the document has been verified.
 * @property {Date} [expiration_date] - Expiration date of the document, if applicable.
 * @property {boolean} is_expired - Whether the document is expired.
 * @property {string} [review_notes] - Notes from the review process.
 * @property {string} [rejection_reason] - Reason for rejection if the document is rejected.
 * @property {Record<string, any>} [validation_errors] - Any validation errors from Twilio.
 * @property {boolean} is_confidential - Whether the document contains confidential information.
 * @property {string} access_level - Access level for the document (business_admin, compliance_officer, system).
 * @property {Record<string, any>} [twilio_response] - Full Twilio API response for debugging.
 * @property {Record<string, any>} [errors] - Errors encountered during creation or updates.
 * @property {Date} created_at - Timestamp when the document was created.
 * @property {Date} updated_at - Timestamp when the document was last updated.
 * @property {Date | null} deleted_at - Timestamp when the document was soft-deleted (paranoid).
 */
export interface ISupportingDocument extends Document {
  business_id: Types.ObjectId;
  supporting_document_sid?: string;
  customer_profile_id?: Types.ObjectId;
  friendly_name: string;
  type: string;
  attributes: Record<string, any>;
  document_category: 'business_license' | 'tax_document' | 'utility_bill' | 'bank_statement' | 'articles_of_incorporation' | 'government_id' | 'other';
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  file_url?: string;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'PROVISIONALLY_APPROVED' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  verified: boolean;
  expiration_date?: Date;
  is_expired: boolean;
  review_notes?: string;
  rejection_reason?: string;
  validation_errors?: Record<string, any>;
  is_confidential: boolean;
  access_level: 'business_admin' | 'compliance_officer' | 'system';
  twilio_response?: Record<string, any>;
  errors?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

