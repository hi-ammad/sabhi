import type { Document, Types } from "mongoose";

/**
 * @interface IBrand
 * Represents a Brand document in MongoDB
 * @property {Types.ObjectId} business_id - Reference to the Business
 * @property {string} brand_sid - Unique Twilio Brand SID
 * @property {string} friendly_name - Human-readable name for the brand
 * @property {string} legal_name - Legal business name as registered
 * @property {string} [dba_name] - Doing Business As name (if different from legal name)
 * @property {string} business_type - Type of business entity
 * @property {string} industry - Business industry or vertical
 * @property {string} [ein] - Employer Identification Number (for businesses)
 * @property {string} [tax_id_type] - Type of tax identifier
 * @property {string} [tax_id] - Tax identification number
 * @property {string} [registration_number] - Business registration number
 * @property {string} registration_country - Country where business is registered
 * @property {string} [registration_state] - State where business is registered
 * @property {string} [website] - Business website URL
 * @property {string} email - Primary contact email for the brand
 * @property {string} phone - Primary contact phone number
 * @property {string} street - Street address line 1
 * @property {string} [street2] - Street address line 2 (optional)
 * @property {string} city - City name
 * @property {string} state - State abbreviation (e.g., TX, CA)
 * @property {string} postal_code - ZIP/postal code
 * @property {string} country - Country code
 * @property {string} status - Current registration status with TCR
 * @property {string} brand_type - Type of brand registration
 * @property {Date} [submitted_at] - When the brand was submitted to TCR
 * @property {Date} [approved_at] - When the brand was approved by TCR
 * @property {Date} [rejected_at] - When the brand was rejected by TCR
 * @property {string} [rejection_reason] - Reason for rejection if applicable
 * @property {string} [rejection_code] - TCR rejection code
 * @property {string} [customer_profile_sid] - Secondary Customer Profile SID used for brand registration
 * @property {string} [trust_product_sid] - A2P Trust Product SID used for brand registration
 * @property {boolean} skip_automatic_sec_vet - Whether to skip automatic secondary vetting
 * @property {string} [tcr_brand_id] - Brand ID assigned by The Campaign Registry
 * @property {string} [tcr_id] - TCR ID from brandRegistrations API
 * @property {number} [brand_score] - Brand trust score assigned by TCR
 * @property {string} [brand_tier] - Brand tier classification from TCR
 * @property {string} identity_status - Status of business identity verification
 * @property {string} vetting_status - Status of business vetting process
 * @property {string} [compliance_contact_first_name] - First name of compliance contact
 * @property {string} [compliance_contact_last_name] - Last name of compliance contact
 * @property {string} [compliance_contact_email] - Email of compliance contact
 * @property {string} [compliance_contact_phone] - Phone number of compliance contact
 * @property {string} [compliance_contact_job_title] - Job title of compliance contact
 * @property {string} [description] - Description of the business and use case
 * @property {string} [stock_symbol] - Stock symbol for public companies
 * @property {string} [stock_exchange] - Stock exchange for public companies
 * @property {string} [ip_address] - IP address used during registration
 * @property {any} twilio_response - Latest Twilio API response for debugging
 * @property {any} tcr_response - Latest TCR response data
 * @property {any} validation_errors - Array of validation errors from registration
 * @property {any} webhook_events - Array of webhook events received for this brand
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */
export interface IBrand extends Document {
  business: Types.ObjectId;
  brand: Types.ObjectId;
  brand_sid: string;
  friendly_name: string;
  legal_name: string;
  dba_name?: string;
  business_type: string;
  industry: string;
  ein?: string;
  tax_id_type?: string;
  tax_id?: string;
  registration_number?: string;
  registration_country: string;
  registration_state?: string;
  website?: string;
  email: string;
  phone: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  status: string;
  brand_type: string;
  submitted_at?: Date;
  approved_at?: Date;
  rejected_at?: Date;
  rejection_reason?: string;
  rejection_code?: string;
  customer_profile_sid?: string;
  trust_product_sid?: string;
  skip_automatic_sec_vet: boolean;
  tcr_brand_id?: string;
  tcr_id?: string;
  brand_score?: number;
  brand_tier?: string;
  identity_status: string;
  vetting_status: string;
  compliance_contact_first_name?: string;
  compliance_contact_last_name?: string;
  compliance_contact_email?: string;
  compliance_contact_phone?: string;
  compliance_contact_job_title?: string;
  description?: string;
  stock_symbol?: string;
  stock_exchange?: string;
  ip_address?: string;
  twilio_response?: any;
  tcr_response?: any;
  validation_errors?: any;
  webhook_events?: any[];
}
