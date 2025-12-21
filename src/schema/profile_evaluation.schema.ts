
import type { IProfileEvaluation, IProfileEvaluationMethods } from '@/type';
import { Schema } from 'mongoose';

/**
 * Mongoose schema for the ProfileEvaluation model.
 */
const profileEvaluationSchema = new Schema<IProfileEvaluation & IProfileEvaluationMethods>({
  businessId: { type: Number, required: true },
  customerProfileId: { type: Schema.Types.ObjectId, required: true, ref: 'CustomerProfile' },
  customerProfileSid: { type: String, required: true },
  evaluationSid: { type: String, unique: true, required: false, match: /^EL[0-9a-fA-F]{32}$/ },
  evaluationStep: {
    type: String,
    enum: ['assignment', 'evaluation', 'submission'],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending-review', 'in-review', 'twilio-rejected', 'twilio-approved', 'compliant', 'noncompliant'],
    default: 'draft'
  },
  policySid: { type: String },
  primaryProfileSid: { type: String },
  primaryAssignmentSid: { type: String },
  evaluationResults: { type: Schema.Types.Mixed },
  validationErrors: { type: Schema.Types.Mixed },
  submittedAt: { type: Date },
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  attemptCount: { type: Number, default: 1 },
  lastAttemptAt: { type: Date, default: Date.now },
  retryAfter: { type: Date },
  complianceScore: { type: Number, min: 0, max: 100 },
  requiresAttention: { type: Boolean, default: false },
  lastWebhookAt: { type: Date },
  webhookCount: { type: Number, default: 0 },
  twilioResponse: { type: Schema.Types.Mixed },
  errors_messages: { type: Schema.Types.Mixed },
  notes: { type: String },
}, {
  timestamps: true,
  collection: 'profile_evaluations',
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      return ret;
    },
  },
});

/**
 * Instance method to determine if the profile evaluation requires attention.
 * @returns {boolean} Whether the evaluation requires manual attention.
 */
profileEvaluationSchema.methods.needsAttention = function (): boolean {
  return this.requiresAttention;
};

/**
 * Instance method to check if the profile evaluation is still pending review.
 * @returns {boolean} Whether the evaluation is still in the pending-review status.
 */
profileEvaluationSchema.methods.isPendingReview = function (): boolean {
  return this.status === 'pending-review';
};

export { profileEvaluationSchema };
