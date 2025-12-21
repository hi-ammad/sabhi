
import type { ICustomerProfile } from '@/type/customer_profile.type';
import { Schema } from 'mongoose';

/**
 * Mongoose schema for the CustomerProfile model.
 * Defines the structure of the CustomerProfile collection in MongoDB.
 * 
 * @param {ICustomerProfile} ICustomerProfile - Interface representing the document structure.
 */
const customerProfileSchema = new Schema<ICustomerProfile>(
  {
    customer_profile_sid: { type: String, required: true, unique: true },
    friendly_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Email validation
    policy_sid: { type: String, required: true, default: 'RNdfbf3fae0e1107f8aded0e7cead80bf5' },
    status_callback: { type: String, default: null },
    status: {
      type: String,
      enum: ['draft', 'pending-review', 'in-review', 'twilio-approved', 'twilio-rejected'],
      default: 'draft'
    },
    valid_until: { type: Date, default: null },
    last_evaluation_sid: { type: String, default: null },
    last_evaluation_status: {
      type: String,
      enum: ['compliant', 'noncompliant'],
      default: null
    },
    last_evaluation_results: { type: Schema.Types.Mixed, default: null },
    primary_customer_profile_sid: { type: String, default: null },
    linking_entity_assignment_sid: { type: String, default: null },
    submitted_at: { type: Date, default: null },
    approved_at: { type: Date, default: null },
    rejected_at: { type: Date, default: null },
    errors_messages: { type: Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true, // Automatically adds created_at and updated_at fields
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } },
    toObject: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } }
  }
);

// customerProfileSchema.virtual('end_users', {
//   ref: 'EndUser',
//   localField: '_id',
//   foreignField: 'customer_profile_id'
// });

customerProfileSchema.virtual('end_users', {
  ref: 'EndUser',
  localField: '_id',
  foreignField: 'customer_profile'
});

export { customerProfileSchema };
