import { EUserStatus } from "@/enum";
import { User } from "@/model";
import type { IBusiness } from "@/type";
import { Schema } from "mongoose";

/**
 * Mongoose schema for the Business model
 */
const businessSchema = new Schema<IBusiness>(
  {
    name: { type: String, default: null },
    industry: { type: String, required: true },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip_code: { type: String, default: null },
    status: {
      type: String,
      enum: Object.values(EUserStatus),
      default: EUserStatus.ACTIVE,
    },
    sms_usage: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, default: null },
    facebook_url: { type: [String], default: [] },
    description: { type: String, default: null },
    business_type: { type: String, default: null },
    operating_hours: { type: String, default: null },
    phone: { type: String, default: null },
    preferred_channel: { type: String, default: null },
    notification_channel: { type: String, default: null },
    whatsapp: { type: String, default: null },
    license_number: { type: String, default: null },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false, // removes __v
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id; // remove _id from API response
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

businessSchema.pre('deleteOne', async function () {
  await User.deleteMany({ business: this._id });
});

businessSchema.virtual('templates', {
  ref: 'BusinessTemplate',
  localField: '_id',
  foreignField: 'added_by'
});


businessSchema.virtual('subscriptions', {
  ref: 'BusinessSubscription',
  localField: '_id',
  foreignField: 'business'
});

businessSchema.virtual('sale_clerks', {
  ref: 'User',
  localField: '_id',
  foreignField: 'business',
  where: { role: 'sale_clerk' }
});


businessSchema.virtual('customers', {
  ref: 'User',
  localField: '_id',
  foreignField: 'business',
  where: { role: 'sale_clerk' }
});


businessSchema.virtual('customers_profiles', {
  ref: 'User',
  localField: '_id',
  foreignField: 'business',
  where: { role: 'sale_clerk' }
});


businessSchema.virtual('compliance_status', {
  ref: 'ComplianceStatus',
  localField: '_id',
  foreignField: 'business',
  justOne: true
});

export { businessSchema };
