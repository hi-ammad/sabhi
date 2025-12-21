import { Document, Types } from "mongoose";

/**
 * Interface for the Messaging Service document in MongoDB.
 * 
 * @interface IMessagingService
 * @property {Types.ObjectId} business_id - Reference to the Business associated with the Messaging Service.
 * @property {string} messaging_service_sid - Unique SID for the Messaging Service (e.g., MGxxxx).
 * @property {string} friendly_name - Human-readable name for the messaging service.
 * @property {string} use_case - The primary use case for this messaging service (MIXED, TRANSACTIONAL, etc.).
 * @property {string} description - Description of the messaging service's purpose.
 * @property {string} inbound_request_url - URL for incoming message webhooks.
 * @property {string} inbound_method - HTTP method for inbound webhooks (GET or POST).
 * @property {string} fallback_url - URL for fallback webhooks.
 * @property {boolean} sticky_sender - Whether to maintain sender-recipient number mapping.
 * @property {boolean} mms_converter - Whether to convert MMS to SMS for unsupported carriers.
 * @property {boolean} smart_encoding - Whether to optimize message encoding to reduce segments.
 * @property {boolean} fallback_to_long_code - Whether to use a long code if a short code is unavailable.
 * @property {boolean} area_code_geomatch - Whether to match the sender number area code to the recipient.
 * @property {number} validity_period - The message validity period in seconds (default: 14400).
 * @property {boolean} synchronous_validation - Whether to validate phone numbers before sending.
 * @property {string[]} campaign_sids - An array of associated campaign SIDs.
 * @property {number} phone_number_count - The number of phone numbers in the service.
 * @property {string[]} phone_number_sids - An array of phone number SIDs associated with the service.
 * @property {number} monthly_message_count - The number of messages sent this month.
 * @property {number} total_message_count - The total number of messages sent all time.
 * @property {Date} last_message_at - Timestamp of the last message sent.
 * @property {string} status - The current status of the messaging service (draft, active, suspended, inactive).
 * @property {boolean} is_active - Whether the service is currently active.
 * @property {boolean} use_inbound_webhook_on_number - Whether to override the service webhook with a number-specific webhook.
 * @property {any} twilio_response - The full response from Twilio API for debugging.
 * @property {Date} activated_at - When the service was first activated.
 * @property {Date} suspended_at - When the service was suspended.
 */
export interface IMessagingService extends Document {
  business: Types.ObjectId;
  messaging_service: Types.ObjectId;
  friendly_name: string;
  use_case: "MIXED" | "TRANSACTIONAL" | "PROMOTIONAL";
  description?: string;
  inbound_request_url?: string;
  inbound_method: "GET" | "POST";
  fallback_url?: string;
  sticky_sender: boolean;
  mms_converter: boolean;
  smart_encoding: boolean;
  scan_message_content?: "inherit" | "enable" | "disable";
  fallback_to_long_code: boolean;
  area_code_geomatch: boolean;
  validity_period: number;
  synchronous_validation: boolean;
  campaign_sids: string[];
  phone_number_count: number;
  phone_number_sids: string[];
  monthly_message_count: number;
  total_message_count: number;
  last_message_at?: Date;
  status: "draft" | "active" | "suspended" | "inactive";
  is_active: boolean;
  use_inbound_webhook_on_number: boolean;
  twilio_response?: any;
  activated_at?: Date;
  suspended_at?: Date;
}
