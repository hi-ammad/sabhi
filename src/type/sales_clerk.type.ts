import { Document, Types } from 'mongoose';

/**
 * Interface for SalesClerk Document.
 * Represents a sales clerk who is associated with a user and manages customers.
 */
export interface ISalesClerk extends Document {
  /**
   * The user ID of the sales clerk.
   */
  user_id: Types.ObjectId;

  /**
   * The status of the sales clerk (ACTIVE or INACTIVE).
   */
  status: 'ACTIVE' | 'INACTIVE';

  /**
   * The business ID associated with the sales clerk.
   */
  business_id: Types.ObjectId;

  /**
   * Whether the sales clerk is retained on the next plan.
   */
  not_retain_on_next_plan: boolean;

  /**
   * The date the sales clerk was deleted, if applicable (soft delete).
   */
  deleted_at?: Date;

  /**
   * The date the sales clerk was created.
   */
  created_at: Date;

  /**
   * The date the sales clerk was last updated.
   */
  updated_at: Date;
}

/**
 * Methods for SalesClerk instance.
 */
export interface ISalesClerkMethods {
  /**
   * Marks the sales clerk as inactive.
   * @returns {Promise<ISalesClerk>} The updated sales clerk document.
   */
  deactivate(): Promise<ISalesClerk>;

  /**
   * Marks the sales clerk as active.
   * @returns {Promise<ISalesClerk>} The updated sales clerk document.
   */
  activate(): Promise<ISalesClerk>;
}

