
import type { EUserStatus } from "@/enum";
import type { Document, Types } from "mongoose";

/**
 * @interface IBusiness
 * Represents a business document in MongoDB
 * 
 * @property {string} [name] - Name of the business
 * @property {string} industry - Industry type (required)
 * @property {string} [address] - Street address
 * @property {string} [city] - City name
 * @property {string} [state] - State name
 * @property {string} [zip_code] - Postal code
 * @property {string} status - Status of business (active/inactive)
 * @property {number} sms_usage - Number of SMS used
 * @property {string} [image] - Image URL
 * @property {string[]} facebook_url - Array of Facebook URLs
 * @property {string} [description] - Description of the business
 * @property {string} [business_type] - Type of business
 * @property {string} [operating_hours] - Operating hours
 * @property {string} [phone] - Phone number (forbidden in API)
 * @property {string} [preferred_channel] - Preferred communication channel
 * @property {string} [notification_channel] - Notification channel
 * @property {string} [whatsapp] - WhatsApp number
 * @property {string} [license_number] - License number
 * @property {Date} [deleted_at] - Soft delete timestamp
 * @property {Date} created_at - Creation timestamp
 * @property {Date} updated_at - Last update timestamp
 */
export interface IBusiness extends Document {
  name?: string;
  industry: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  status: EUserStatus;
  sms_usage: number;
  image?: string;
  facebook_url: string[];
  description?: string;
  business_type?: string;
  operating_hours?: string;
  phone?: string;
  preferred_channel?: string;
  notification_channel?: string;
  whatsapp?: string;
  license_number?: string;
  deleted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
