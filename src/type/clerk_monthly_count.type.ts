import type { IBusinessAdmin, ISalesClerk } from '@/type';
import type { Ref } from '@/type/mongoose';

/**
 * @interface IClerkMonthlyCount
 * Represents the monthly message count for a sales clerk.
 * 
 * @property {Ref<ISalesClerk>} clerk - Reference to the sales clerk.
 * @property {Ref<IBusinessAdmin>} business - Reference to the business.
 * @property {number} month - The month for which the count is recorded (1-12).
 * @property {number} year - The year for which the count is recorded.
 * @property {number} message_count - The number of messages sent/received.
 * @property {Date} created_at - Timestamp when the record was created.
 * @property {Date} updated_at - Timestamp when the record was last updated.
 */
export interface IClerkMonthlyCount {
  clerk: Ref<ISalesClerk>;
  business: Ref<IBusinessAdmin>;
  month: number;
  year: number;
  message_count?: number;
  created_at?: Date;
  updated_at?: Date;
}

