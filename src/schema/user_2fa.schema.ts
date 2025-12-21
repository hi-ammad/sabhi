// schemas/user2fa.schema.ts

import { Schema, Types } from 'mongoose';

/**
 * Mongoose Schema for User2FA.
 * Represents the 2FA configuration for a user, including SMS enablement and
 * timestamps for when 2FA was last enabled or disabled.
 * 
 * @model User2FA
 */
const user2FASchema = new Schema({
  user_id: {
    type: Types.ObjectId,  // Assumed that `userId` is a reference to the `User` model
    required: true,
    ref: 'User'  // Reference to the User model
  },
  sms_enabled: {
    type: Boolean,
    default: false
  },
  last_enabled_at: {
    type: Date,
    default: null
  },
  last_disabled_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,  // Removes the __v field
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Association (optional, if using virtuals or populating)
user2FASchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

export { user2FASchema };

