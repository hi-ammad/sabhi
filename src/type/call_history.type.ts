// src/types/callHistoryTypes.ts

import { Types } from 'mongoose';

/**
 * @interface ICallHistory
 * Represents the call history document in MongoDB.
 * 
 * @property {Types.ObjectId} sales_clerk_id - The sales clerk associated with the call (MongoDB ObjectId).
 * @property {Types.ObjectId} customer_id - The customer associated with the call (MongoDB ObjectId).
 * @property {'incoming' | 'outgoing' | 'missed' | 'rejected'} call_status - The status of the call.
 * @property {Date} start_time - The start date & time of the call.
 * @property {Date} end_time - The end date & time of the call.
 * @property {Date} deleted_at - The timestamp when the call record was deleted (if applicable).
 * @property {Date} created_at - The timestamp when the record was created.
 * @property {Date} updated_at - The timestamp when the record was last updated.
 */
export interface ICallHistory {
  sales_clerk_id: Types.ObjectId;
  customer_id: Types.ObjectId;
  call_status: 'incoming' | 'outgoing' | 'missed' | 'rejected';
  start_time: Date;
  end_time: Date;
  deleted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

