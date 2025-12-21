import { Schema } from 'mongoose';
import type { IClerkMonthlyCount } from '@/types/clerkMonthlyCountTypes';

/**
 * Mongoose schema for ClerkMonthlyCount.
 * Tracks monthly message counts per clerk per business.
 */
export const clerkMonthlyCountSchema = new Schema<IClerkMonthlyCount>(
  {
    clerk: { type: Schema.Types.ObjectId, ref: 'SalesClerk', required: true },
    business: { type: Schema.Types.ObjectId, ref: 'BusinessAdmin', required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true },
    message_count: { type: Number, default: 1 }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

// Compound unique index to prevent duplicates
clerkMonthlyCountSchema.index({ clerk: 1, month: 1, year: 1 }, { unique: true });
