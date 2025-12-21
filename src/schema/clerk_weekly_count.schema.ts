
import { Schema } from 'mongoose';
import type { IClerkWeeklyCount } from '@/type';

/**
 * Mongoose schema for ClerkWeeklyCount.
 * Tracks weekly message counts per clerk per business.
 */
export const clerkWeeklyCountSchema = new Schema<IClerkWeeklyCount>(
  {
    clerk: { type: Schema.Types.ObjectId, ref: 'SalesClerk', required: true },
    business: { type: Schema.Types.ObjectId, ref: 'BusinessAdmin', required: true },
    week: { type: Number, required: true, min: 1, max: 53 },
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
clerkWeeklyCountSchema.index({ clerk: 1, week: 1, year: 1 }, { unique: true });
