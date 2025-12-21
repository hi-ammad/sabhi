// src/types/businessUsageTypes.ts

import { Types } from 'mongoose';

/**
 * @interface IBusinessUsage
 * Represents the business usage document in MongoDB.
 * 
 * @property {Types.ObjectId} business_id - The business associated with the usage record (MongoDB ObjectId).
 * @property {number} monthly_limit - The monthly usage limit for the business.
 * @property {number} current_count - The current usage count for the business.
 * @property {Date} last_reset - The last reset date for the business's usage count.
 * @property {Date} created_at - The timestamp when the usage record was created.
 * @property {Date} updated_at - The timestamp when the usage record was last updated.
 */
export interface IBusinessUsage {
  business_id: Types.ObjectId;
  monthly_limit: number;
  current_count: number;
  last_reset: Date;
  created_at: Date;
  updated_at: Date;
}

