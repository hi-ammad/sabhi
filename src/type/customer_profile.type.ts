
/**
 * @interface ICustomerProfile
 * Represents the customer profile document in MongoDB.
 * 
 * @property {string} customer_profile_sid - Twilio CustomerProfile SID (e.g., "BUxxxxxxxxxxxxxxx")
 * @property {string} friendly_name - Friendly name for the customer profile
 * @property {string} email - Contact email for the customer profile
 * @property {string} policy_sid - Twilio Policy SID for Secondary Customer Profile
 * @property {string} status_callback - Optional webhook URL for status updates
 * @property {string} status - Status of the customer profile (e.g., "draft", "pending-review", etc.)
 * @property {Date} valid_until - Expiration date for the customer profile
 * @property {string} last_evaluation_sid - SID of the last evaluation performed
 * @property {string} last_evaluation_status - Status of the last compliance evaluation
 * @property {any} last_evaluation_results - Detailed results from the last evaluation
 * @property {string} primary_customer_profile_sid - Primary CustomerProfile SID this profile is linked to
 * @property {string} linking_entity_assignment_sid - SID for linking to primary profile
 * @property {Date} submitted_at - When the profile was submitted for review
 * @property {Date} approved_at - When the profile was approved by Twilio
 * @property {Date} rejected_at - When the profile was rejected by Twilio
 * @property {any} errors - Any errors returned from Twilio
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */
export interface ICustomerProfile {
  customer_profile_sid: string;
  friendly_name: string;
  email: string;
  policy_sid: string;
  status_callback: string | null;
  status: 'draft' | 'pending-review' | 'in-review' | 'twilio-approved' | 'twilio-rejected' | null;
  valid_until: Date | null;
  last_evaluation_sid: string | null;
  last_evaluation_status: 'compliant' | 'noncompliant' | null;
  last_evaluation_results: any | null;
  primary_customer_profile_sid: string | null;
  linking_entity_assignment_sid: string | null;
  submitted_at: Date | null;
  approved_at: Date | null;
  rejected_at: Date | null;
  errors: any | null;
  created_at: Date;
  updated_at: Date;
}

