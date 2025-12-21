import { Document, Types } from "mongoose";
/**
 * @interface IAddress
 * Represents an address document in MongoDB
 *
 * @property {Types.ObjectId} business_id - Reference to the Business
 * @property {string} address_sid - Unique Twilio Address SID (e.g. "ADxxxxxxxxxxxxxxxxxxxxxx")
 * @property {Types.ObjectId} [customer_profile_id] - Reference to a CustomerProfile for compliance
 * @property {string} customer_name - Name of the customer or company
 * @property {string} street - Street address
 * @property {string} city - City
 * @property {string} region - State or region
 * @property {string} postal_code - ZIP or postal code
 * @property {string} [street_secondary] - Secondary address line (e.g., apartment, suite)
 * @property {string} iso_country - ISO country code (e.g., "US")
 * @property {string} [friendly_name] - Human-readable name for the address
 * @property {boolean} auto_correct_address - Whether Twilio should auto-correct the address
 * @property {boolean} verified - Whether the address has been verified by Twilio
 * @property {boolean} emergency_enabled - Whether this address can be used for emergency services
 * @property {any} validation_errors - Validation errors from Twilio
 * @property {string} address_type - Type of address (business, residential, po_box)
 * @property {string} status - Status of the address (active, inactive, error)
 * @property {any} twilio_response - Full Twilio API response for debugging
 * @property {any} errors - Errors encountered during creation or updates
 * @property {Date} [deleted_at] - Soft delete timestamp
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */
export interface IAddress extends Document {
  business: Types.ObjectId;
  address_sid: string;
  customer_profile?: Types.ObjectId;
  customer_name: string;
  street: string;
  city: string;
  region: string;
  postal_code: string;
  street_secondary?: string;
  iso_country: string;
  friendly_name?: string;
  auto_correct_address: boolean;
  verified: boolean;
  emergency_enabled: boolean;
  validation_errors?: any;
  address_type: "business" | "residential" | "po_box";
  status: "active" | "inactive" | "error";
  twilio_response?: any;
  errors?: any;
  deleted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
