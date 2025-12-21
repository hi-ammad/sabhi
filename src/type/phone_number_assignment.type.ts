
import { Document } from "mongoose";

/**
 * Represents a phone number assignment document in MongoDB.
 *
 * @interface IPhoneNumberAssignment
 * @extends Document
 * 
 * @property {string} phone_number_sid - Unique Twilio Phone Number SID (e.g., PNxxxx).
 * @property {string} phone_number - The E.164 formatted phone number.
 * @property {string} friendly_name - Human-readable name for the phone number.
 * @property {"local" | "toll-free" | "short-code" | "mobile"} number_type - Type of phone number.
 * @property {string} country_code - ISO country code (default "US").
 * @property {string} region - State or region code.
 * @property {string} locality - City or locality.
 * @property {string} postal_code - Postal/ZIP code.
 * @property {string} area_code - Phone number area code.
 * @property {boolean} voice_enabled - Whether the number can make/receive voice calls.
 * @property {boolean} sms_enabled - Whether the number can send/receive SMS.
 * @property {boolean} mms_enabled - Whether the number can send/receive MMS.
 * @property {boolean} fax_enabled - Whether the number can send/receive fax.
 * @property {string} voice_url - Webhook URL for voice calls.
 * @property {string} sms_url - Webhook URL for SMS messages.
 * @property {boolean} is_primary - Whether the phone number is the primary number for the business.
 * @property {boolean} is_active - Whether the phone number is currently active.
 * @property {Date} created_at - Creation timestamp.
 * @property {Date} updated_at - Last update timestamp.
 */
export interface IPhoneNumberAssignment extends Document {
  phone_number_sid: string;
  phone_number: string;
  friendly_name?: string;
  number_type: "local" | "toll-free" | "short-code" | "mobile";
  country_code: string;
  region?: string;
  locality?: string;
  postal_code?: string;
  area_code?: string;
  voice_enabled: boolean;
  sms_enabled: boolean;
  mms_enabled: boolean;
  fax_enabled: boolean;
  voice_url?: string;
  voice_method?: "GET" | "POST";
  voice_fallback_url?: string;
  sms_url?: string;
  sms_method?: "GET" | "POST";
  sms_fallback_url?: string;
  status_callback_url?: string;
  status_callback_method?: "GET" | "POST";
  is_primary: boolean;
  is_active: boolean;
  purchased_at?: Date;
  released_at?: Date;
  created_at: Date;
  updated_at: Date;
}





/**
 * Instance methods for the PhoneNumberAssignment model.
 * These methods operate on individual documents of the PhoneNumberAssignment model.
 */
export interface IPhoneNumberAssignmentMethods {
  /**
   * Checks if the phone number is ready for messaging.
   * @returns {boolean} True if the phone number is active, A2P compliant, and can send SMS.
   */
  isReadyForMessaging(): boolean;

  /**
   * Checks if the phone number can send messages.
   * @returns {boolean} True if the phone number is active and SMS-enabled.
   */
  canSendMessages(): boolean;

  /**
   * Checks if the phone number can receive calls.
   * @returns {boolean} True if the phone number is active and voice-enabled.
   */
  canReceiveCalls(): boolean;

  /**
   * Gets the monthly usage for SMS and voice minutes.
   * @returns {object} An object containing monthly SMS sent, received, voice minutes, and cost.
   */
  getMonthlyUsage(): {
    sms_sent: number;
    sms_received: number;
    voice_minutes: number;
    cost: number;
  };

  /**
   * Resets the monthly usage stats (SMS, voice, and cost).
   * @returns {Promise<IPhoneNumberAssignment>} The updated phone number assignment document.
   */
  resetMonthlyUsage(): Promise<IPhoneNumberAssignment>;
}
