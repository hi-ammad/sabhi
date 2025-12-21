import { EPlans } from '@/enum/index.ts';
import type { IBusinessSubscription } from '@/type/business_subscription.type.js';
import mongoose from 'mongoose';

const { Schema } = mongoose;
const businessSubscriptionSchema = new Schema<IBusinessSubscription>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true
    },

    customer: {
      type: String,
      required: true
    },

    payment_plan: {
      type: String,
      default: null
    },

    plan_name: {
      type: String,
      enum: Object.values(EPlans),
      default: null
    },

    subscription_id: {
      type: String,
      default: null
    },

    trial_start: {
      type: Date,
      default: null
    },

    trial_end: {
      type: Date,
      default: null
    },

    subscription_start: {
      type: Date,
      default: null
    },

    subscription_end: {
      type: Date,
      default: null
    },

    is_trial: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Pending'],
      default: 'Active'
    },

    cancel_at_period_end: {
      type: Boolean,
      default: false
    },

    canceled_at: {
      type: Date,
      default: null
    },

    schedule_plan_id: {
      type: String,
      default: null
    },

    schedule_plan_name: {
      type: String,
      enum: Object.values(EPlans),
      default: null
    },

    scheduled_change_at: {
      type: Date,
      default: null
    },

    // Sequelize paranoid equivalent
    deleted_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

export { businessSubscriptionSchema };
