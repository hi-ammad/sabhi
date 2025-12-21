
// src/models/customerModel.ts

import type { ICustomer } from '@/type';
import { Schema, Types } from 'mongoose';

const customerSchema = new Schema<ICustomer>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }, // Status can be either active or inactive
    assigned_sales_clerk: { type: Types.ObjectId, ref: 'SalesClerk', required: false, default: null }, // Reference to SalesClerk model
    business: { type: Types.ObjectId, ref: 'Business', required: false, default: null }, // Reference to Business model
  },
  {
    timestamps: true, // Automatically adds created_at and updated_at fields
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } },
    toObject: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } }
  }
);

export { customerSchema };
