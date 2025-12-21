// models/phone_number_assignment.schema.ts

import type { IPhoneNumberAssignment, IPhoneNumberAssignmentMethods } from '@/type';
import { Schema } from 'mongoose';

/**
 * Mongoose schema for the PhoneNumberAssignment model.
 * This schema defines the structure of a phone number assignment document.
 */
const phoneNumberAssignmentSchema = new Schema<IPhoneNumberAssignment & IPhoneNumberAssignmentMethods>({
  phone_number_sid: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  friendly_name: { type: String, required: false },
  number_type: { type: String, enum: ['local', 'toll-free', 'short-code', 'mobile'], default: 'local' },
  country_code: { type: String, default: 'US' },
  region: { type: String, required: false },
  locality: { type: String, required: false },
  postal_code: { type: String, required: false },
  area_code: { type: String, required: false },
  voice_enabled: { type: Boolean, default: false },
  sms_enabled: { type: Boolean, default: true },
  mms_enabled: { type: Boolean, default: true },
  fax_enabled: { type: Boolean, default: false },
  voice_url: { type: String, required: false },
  voice_method: { type: String, enum: ['GET', 'POST'], default: 'POST' },
  voice_fallback_url: { type: String, required: false },
  sms_url: { type: String, required: false },
  sms_method: { type: String, enum: ['GET', 'POST'], default: 'POST' },
  sms_fallback_url: { type: String, required: false },
  status_callback_url: { type: String, required: false },
  status_callback_method: { type: String, enum: ['GET', 'POST'], default: 'POST' },
  is_primary: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  purchased_at: { type: Date, required: false },
  released_at: { type: Date, required: false },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false, // removes __v version key
});

/**
 * Instance methods for PhoneNumberAssignment model
 */
phoneNumberAssignmentSchema.methods.isReadyForMessaging = function (): boolean {
  return this.status === 'active' && this.sms_enabled && this.is_a2p_compliant;
};

phoneNumberAssignmentSchema.methods.canSendMessages = function (): boolean {
  return this.status === 'active' && this.sms_enabled;
};

phoneNumberAssignmentSchema.methods.canReceiveCalls = function (): boolean {
  return this.status === 'active' && this.voice_enabled;
};

phoneNumberAssignmentSchema.methods.getMonthlyUsage = function (): {
  sms_sent: number;
  sms_received: number;
  voice_minutes: number;
  cost: number;
} {
  return {
    sms_sent: this.monthly_sms_sent,
    sms_received: this.monthly_sms_received,
    voice_minutes: this.monthly_voice_minutes,
    cost: this.monthly_cost
  };
};

phoneNumberAssignmentSchema.methods.resetMonthlyUsage = async function (): Promise<IPhoneNumberAssignment> {
  this.monthly_sms_sent = 0;
  this.monthly_sms_received = 0;
  this.monthly_voice_minutes = 0;
  this.monthly_cost = 0;
  return this.save();
};


export { phoneNumberAssignmentSchema };
