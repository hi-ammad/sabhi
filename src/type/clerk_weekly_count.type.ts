import type { IBusinessAdmin, ISalesClerk } from '@/type';
import type { Ref } from '@/type/mongoose';

/**
 * @interface IClerkWeeklyCount
 * Represents the weekly message count for a sales clerk.
 * 
 * @property {Ref<ISalesClerk>} clerk - Reference to the sales clerk.
 * @property {Ref<IBusinessAdmin>} business - Reference to the business.
 * @property {number} week - The week number for which the count is recorded (1-53).
 * @property {number} year - The year for which the count is recorded.
 * @property {number} message_count - The number of messages sent/received.
 * @property {Date} created_at - Timestamp when the record was created.
 * @property {Date} updated_at - Timestamp when the record was last updated.
 */
export interface IClerkWeeklyCount {
  clerk: Ref<ISalesClerk>;
  business: Ref<IBusinessAdmin>;
  week: number;
  year: number;
  message_count?: number;
  created_at?: Date;
  updated_at?: Date;
}

