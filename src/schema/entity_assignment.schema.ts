// src/models/entityAssignmentModel.ts

import type { IEntityAssignment } from '@/type';
import { Schema, Types, } from 'mongoose';

/**
 * Mongoose schema for the EntityAssignment model.
 */
const entityAssignmentSchema = new Schema<IEntityAssignment>(
  {
    entity_assignment_sid: { type: String, unique: true, default: null },
    customer_profile: { type: Types.ObjectId, ref: 'User', required: true },
    object_sid: { type: String, required: true },

    object_type: {
      type: String,
      enum: ['EndUser', 'SupportingDocument', 'Address', 'CustomerProfile'],
      required: true,
    },
    end_user_type: {
      type: String,
      enum: [
        'customer_profile_business_information',
        'authorized_representative_1',
        'authorized_representative_2',
        'us_a2p_messaging_profile_information',
      ],
      default: null,
    },
    assignment_type: {
      type: String,
      enum: ['business_info', 'authorized_rep', 'address_document', 'profile_linking'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'error'],
      default: 'active',
    },
    end_user: { type: Schema.Types.ObjectId, ref: 'EndUser', default: null },
    supporting_document: { type: Schema.Types.ObjectId, ref: 'SupportingDocument', default: null },
    address: { type: Schema.Types.ObjectId, ref: 'Address', default: null },
    assigned_at: { type: Date, default: Date.now },
    twilio_response: { type: Schema.Types.Mixed, default: null },
    errors_messages: { type: Schema.Types.Mixed, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
export { entityAssignmentSchema };
