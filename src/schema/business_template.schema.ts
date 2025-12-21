import type { IBusinessTemplate } from '@/type';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const businessTemplateSchema = new Schema<IBusinessTemplate>(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true
    },

    template_id: {
      type: String,
      required: true
      // Twilio Content SID (e.g., HX6f133652e0c4d9f17f126786459e2ccf)
    },

    template_name: {
      type: String,
      default: null
      // Friendly name of the template for easier identification
    },

    added_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
      // ID of the user who added this template to the business
    },

    is_active: {
      type: Boolean,
      default: true
      // Whether this template is active for the business
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

businessTemplateSchema.index({ business_id: 1 });
businessTemplateSchema.index({ template_id: 1 });

export { businessTemplateSchema };
