import { Types } from 'mongoose';

/**
 * @interface IClerkDailyCount
 * Represents the daily count of messages for a sales clerk.
 * 
 * @property {number} clerk_id - The ID of the sales clerk.
 * @property {number} business_id - The ID of the business.
 * @property {string} date - The date for which the message count is recorded (YYYY-MM-DD).
 * @property {number} message_count - The number of messages sent/received.
 * @property {Date} created_at - Timestamp when the record was created.
 * @property {Date} updated_at - Timestamp when the record was last updated.
 */
export interface IClerkDailyCount {
  clerk: ;
  business: number;
  date: string;
  message_count?: number;
  created_at?: Date;
  updated_at?: Date;
}
