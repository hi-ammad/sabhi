import type { Types } from "mongoose";

/**
 * @interface IBusinessSubscription
 * Represents a business subscription document in MongoDB.
 * @property {Types.ObjectId} user - The ID of the user associated with the subscription (MongoDB ObjectId).
 * @property {Types.ObjectId} business - The ID of the business associated with the subscription (MongoDB ObjectId).
 * @property {string} customer - The unique ID of the customer.
 * @property {string} [payment_plan_id] - The ID of the payment plan, if available.
 * @property {string} [plan_name] - The name of the subscription plan.
 * @property {Types.ObjectId} [subscription_id] - The unique subscription ID (MongoDB ObjectId).
 * @property {Date} [trial_start] - The start date of the trial period, if applicable.
 * @property {Date} [trial_end] - The end date of the trial period, if applicable.
 * @property {Date} [subscription_start] - The start date of the subscription.
 * @property {Date} [subscription_end] - The end date of the subscription.
 * @property {boolean} is_trial - Whether the subscription is a trial.
 * @property {'Active' | 'Inactive' | 'Pending'} status - The current status of the subscription.
 * @property {boolean} cancel_at_period_end - Whether the subscription will cancel at the end of the period.
 * @property {Date} [canceled_at] - The timestamp when the subscription was canceled, if applicable.
 * @property {string} [schedule_plan_id] - The ID of the scheduled plan, if applicable.
 * @property {string} [schedule_plan_name] - The name of the scheduled plan, if applicable.
 * @property {Date} [scheduled_change_at] - The timestamp when the plan change is scheduled, if applicable.
 * @property {Date} [deleted_at] - The timestamp when the subscription was soft deleted, if applicable.
 * @property {Date} created_at - The timestamp when the subscription was created.
 * @property {Date} updated_at - The timestamp when the subscription was last updated.
 */
export interface IBusinessSubscription {
  user: Types.ObjectId;
  business: Types.ObjectId;
  customer: string;
  payment_plan?: string;
  plan_name?: string;
  subscription_id?: Types.ObjectId;
  trial_start?: Date;
  trial_end?: Date;
  subscription_start?: Date;
  subscription_end?: Date;
  is_trial: boolean;
  status: 'Active' | 'Inactive' | 'Pending';
  cancel_at_period_end: boolean;
  canceled_at?: Date;
  schedule_plan_id?: string;
  schedule_plan_name?: string;
  scheduled_change_at?: Date;
  deleted_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
