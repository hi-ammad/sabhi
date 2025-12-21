// interfaces/superAdmin.interface.ts

import { Document, Types } from 'mongoose';

/**
 * Interface representing a SuperAdmin document in MongoDB.
 * This document represents a super admin user with a specific status.
 * 
 * @interface ISuperAdmin
 * @property {Types.ObjectId} user_id - The reference to the associated User.
 * @property {string} status - The current status of the SuperAdmin, can be 'Active' or 'Inactive'.
 * @property {Date} created_at - Timestamp when the document was created.
 * @property {Date} updated_at - Timestamp when the document was last updated.
 * @property {Date | null} deleted_at - Timestamp when the document was soft-deleted (paranoid).
 */
export interface ISuperAdmin extends Document {
  user_id: Types.ObjectId;
  status: 'Active' | 'Inactive';
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

