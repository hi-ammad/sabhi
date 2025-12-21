// schemas/slimcd_business_details.schema.ts

import type { ISlimcdBusinessDetails } from '@/type';
import { Schema, Types } from 'mongoose';

const slimcdBusinessDetailsSchema = new Schema<ISlimcdBusinessDetails>({
  business_id: { type: Types.ObjectId, required: true, ref: 'Business' },
  username: { type: String, required: true },
  site_id: { type: String, required: true },
  client_id: { type: Number, required: true },
  form_id: { type: Number, required: true },
  price_id: { type: Number, required: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,  // Removes the __v field
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export { slimcdBusinessDetailsSchema };

