import type { IMessageLog } from '@/type';
import { Schema } from 'mongoose';

/**
 * Mongoose schema for the message_log model.
 */
const messageLogSchema = new Schema<IMessageLog>(
  {
    business_id: { type: Schema.Types.ObjectId, ref: 'Business', required: false },
    sales_clerk_id: { type: Schema.Types.ObjectId, ref: 'SalesClerk', required: false },
    conversation_sid: { type: String, required: false },
    message_sid: { type: String, unique: true, required: true },
    occurred_at_utc: { type: Date, required: false },
    message_type: { type: String, default: 'twilio_sms', required: false },
    date_sent: { type: Date, required: false },
    timestamp: { type: Date, default: Date.now, required: false },
  },
  {
    timestamps: false,  // We don't need timestamps as we already handle it with 'timestamp'
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export { messageLogSchema };
