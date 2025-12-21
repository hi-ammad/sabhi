

import type { EUserStatus } from '@/enum';
import { Types } from 'mongoose';

/**
 * @interface ICustomer
 * Represents the customer document in MongoDB.
 * 
 * @property {Types.ObjectId} user - Reference to the associated user.
 * @property {string} status - The status of the customer (active/inactive).
 * @property {Types.ObjectId} assigned_sales_clerk - The sales clerk assigned to this customer.
 * @property {Types.ObjectId} business_id - The business the customer is associated with.
 * @property {Date} created_at - The timestamp when the customer record was created.
 * @property {Date} updated_at - The timestamp when the customer record was last updated.
 */
export interface ICustomer {
  user: Types.ObjectId;
  status: EUserStatus;
  assigned_sales_clerk: Types.ObjectId | null; // Can be null if no clerk is assigned
  business: Types.ObjectId | null; // Can be null if not assigned to a business
  created_at: Date;
  updated_at: Date;
}
