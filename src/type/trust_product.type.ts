import { Document, Types } from 'mongoose';

/**
 * Interface representing a TrustProduct document in MongoDB.
 * This document contains information about a Twilio TrustProduct (Trust Bundle),
 * including messaging profile details and customer profile linkage.
 * 
 * @interface ITrustProduct
 * @property {Types.ObjectId} business_id - Reference to the associated Business.
 * @property {string} [trust_product_sid] - Unique SID of the Twilio TrustProduct (e.g., "BUxxxxxxxxxxxxxxxxxxxxxx").
 * @property {string} friendly_name - Human-readable name for the Trust Product.
 * @property {string} email - ISV contact email for the Trust Product.
 * @property {string} policy_sid - Twilio A2P Trust Product policy SID.
 * @property {'draft' | 'pending-review' | 'in-review' | 'twilio-approved' | 'twilio-rejected'} status - Current status of the TrustProduct.
 * @property {string} [status_callback] - Webhook URL for status update callbacks.
 * @property {Date} [valid_until] - Expiration date of the TrustProduct, if applicable.
 * @property {'creation' | 'messaging_info' | 'enduser_attach' | 'profile_attach' | 'evaluation' | 'submission'} current_step - Current step in the workflow.
 * @property {string[]} steps_completed - Array of completed workflow steps.
 * @property {string} [customer_profile_sid] - SID of the secondary CustomerProfile attached to this TrustProduct.
 * @property {Types.ObjectId} [customer_profile_id] - Local CustomerProfile ID reference.
 * @property {string} [messaging_profile_end_user_sid] - A2P messaging profile EndUser SID.
 * @property {'not_evaluated' | 'compliant' | 'noncompliant' | 'pending_evaluation' | 'evaluation_failed'} evaluation_status - Latest evaluation status.
 * @property {string} [evaluation_sid] - Latest evaluation SID from Twilio.
 * @property {Record<string, any>} [evaluation_results] - Full evaluation results from Twilio API.
 * @property {Record<string, any>} [evaluation_errors] - Evaluation errors that need to be fixed.
 * @property {Date} [submitted_at] - Date when the TrustProduct was submitted for review.
 * @property {Date} [approved_at] - Date when the TrustProduct was approved by Twilio.
 * @property {Date} [rejected_at] - Date when the TrustProduct was rejected by Twilio.
 * @property {string} [rejection_reason] - Reason for rejection if applicable.
 * @property {Record<string, any>} [twilio_response] - Latest Twilio API response for debugging.
 * @property {Record<string, any>[]} webhook_events - Array of webhook events received for this TrustProduct.
 * @property {Date} created_at - Timestamp when the document was created.
 * @property {Date} updated_at - Timestamp when the document was last updated.
 * @property {Date | null} deleted_at - Timestamp when the document was soft-deleted (paranoid).
 */
export interface ITrustProduct extends Document {
  business_id: Types.ObjectId;
  trust_product_sid?: string;
  friendly_name: string;
  email: string;
  policy_sid: string;
  status: 'draft' | 'pending-review' | 'in-review' | 'twilio-approved' | 'twilio-rejected';
  status_callback?: string;
  valid_until?: Date;
  current_step: 'creation' | 'messaging_info' | 'enduser_attach' | 'profile_attach' | 'evaluation' | 'submission';
  steps_completed: string[];
  customer_profile_sid?: string;
  customer_profile_id?: Types.ObjectId;
  messaging_profile_end_user_sid?: string;
  evaluation_status: 'not_evaluated' | 'compliant' | 'noncompliant' | 'pending_evaluation' | 'evaluation_failed';
  evaluation_sid?: string;
  evaluation_results?: Record<string, any>;
  evaluation_errors?: Record<string, any>;
  submitted_at?: Date;
  approved_at?: Date;
  rejected_at?: Date;
  rejection_reason?: string;
  twilio_response?: Record<string, any>;
  webhook_events: Record<string, any>[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

