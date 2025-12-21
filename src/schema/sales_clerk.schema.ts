import type { ISalesClerk, ISalesClerkMethods } from '@/type';
import { Schema } from 'mongoose';

const salesClerkSchema = new Schema<ISalesClerk & ISalesClerkMethods>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
    required: true,
  },
  business_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Business'
  },
  not_retain_on_next_plan: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true,  // Adds created_at and updated_at automatically
  collection: 'sales_clerks',  // Specifies the collection name
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;  // Remove _id field from the response
      return ret;
    }
  },
});

/**
 * Instance method to deactivate the sales clerk.
 * Sets the status to 'INACTIVE'.
 * @returns {Promise<ISalesClerk>} The updated sales clerk document.
 */
salesClerkSchema.methods.deactivate = async function (): Promise<ISalesClerk> {
  this.status = 'INACTIVE';
  return this.save();
};

export { salesClerkSchema };
