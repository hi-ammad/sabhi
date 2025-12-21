import { Schema } from 'mongoose';
import type { IClerkDailyCount } from '@/type';

/**
 * Mongoose schema for ClerkDailyCount.
 * Tracks daily message counts per clerk per business.
 */
export const clerkDailyCountSchema = new Schema<IClerkDailyCount>(
  {
    clerk: { type: Schema.Types.ObjectId, ref: 'SalesClerk', required: true },
    business: { type: Schema.Types.ObjectId, ref: 'BusinessAdmin', required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
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

// Compound index to enforce uniqueness
clerkDailyCountSchema.index({ clerk: 1, date: 1 }, { unique: true });

