
import type { IConversation } from '@/type';
import { Schema, Types } from 'mongoose';

/**
 * Mongoose schema for the Conversation model.
 * Defines the structure of the Conversation collection in MongoDB.
 * 
 * @param {IConversation} IConversation - Interface representing the document structure.
 */
const conversationSchema = new Schema<IConversation>(
  {
    conversation_sid: { type: String, required: true, unique: true },
    customer_id: { type: Types.ObjectId, ref: 'Customer', required: true }, // Reference to the Customer model
    sales_clerk_id: { type: Types.ObjectId, ref: 'SalesClerk', required: true }, // Reference to the SalesClerk model
    business_id: { type: Types.ObjectId, ref: 'Business', required: true }, // Reference to the Business model
  },
  {
    timestamps: true, // Automatically adds created_at and updated_at fields
    toJSON: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } },
    toObject: { virtuals: true, transform: (_doc, ret) => { delete ret._id; return ret; } }
  }
);


export { conversationSchema };
