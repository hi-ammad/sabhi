// src/models/businessUsageModel.ts

import type { IBusinessUsage } from '@/type';
import { Schema, Types } from 'mongoose';

/**
 * Mongoose schema for the BusinessUsage model.
 * Defines the structure of the BusinessUsage collection in MongoDB.
 * 
 * @param {IBusinessUsage} IBusinessUsage - Interface representing the document structure.
 */
const businessUsageSchema = new Schema<IBusinessUsage>(
  {
    business_id: { type: Types.ObjectId, required: true, ref: 'Business' }, // Reference to the Business model
    monthly_limit: { type: Number, default: 1000 }, // Default value for monthly limit
    current_count: { type: Number, default: 0 },
    last_reset: { type: Date, required: true } // Date when the count was last reset
  },
  {
    timestamps: true, // Automatically add created_at and updated_at
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } },
    toObject: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } }
  }
);

export { businessUsageSchema };
