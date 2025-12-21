// src/models/callHistoryModel.ts

import { EModalNames } from '@/enum';
import type { ICallHistory } from '@/type';
import { Schema, Types } from 'mongoose';

/**
 * Mongoose schema for the CallHistory model.
 * Defines the structure of the CallHistory collection in MongoDB.
 * 
 * @param {ICallHistory} ICallHistory - Interface representing the document structure.
 */
const callHistorySchema = new Schema<ICallHistory>(
  {
    sales_clerk_id: { type: Types.ObjectId, required: true, ref: EModalNames.SALES_CLERK }, // Reference to the SalesClerk model
    customer_id: { type: Types.ObjectId, required: true, ref: EModalNames.CUSTOMER }, // Reference to the Customer model
    call_status: { type: String, enum: ['incoming', 'outgoing', 'missed', 'rejected'], required: true },
    start_time: { type: Date, required: true }, // Start time of the call
    end_time: { type: Date, required: true }, // End time of the call
  },
  {
    timestamps: true, // Automatically add created_at and updated_at
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } },
    toObject: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } }
  }
);

export { callHistorySchema };
