import type { ISuperAdmin } from '@/type';
import { Schema, Types } from 'mongoose';

const superAdminSchema = new Schema<ISuperAdmin>({
  user_id: { type: Types.ObjectId, required: true, ref: 'User' },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
    required: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false, // Removes the __v field
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// You can define associations (populate) here if needed

export { superAdminSchema };

