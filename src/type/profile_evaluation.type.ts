import { Document, Types } from 'mongoose';

/**
 * Interface for ProfileEvaluation Document.
 * Represents a profile evaluation document in MongoDB for tracking the evaluation process.
 */
export interface IProfileEvaluation extends Document {
  /**
   * The ID of the associated business.
   */
  businessId: number;

  /**
   * The unique identifier for the customer profile being evaluated.
   */
  customerProfileId: Types.ObjectId;

  /**
   * The SID of the customer profile on Twilio.
   */
  customerProfileSid: string;

  /**
   * The SID of the evaluation from Twilio.
   * Optional and unique to each evaluation.
   */
  evaluationSid?: string;

  /**
   * The current step of the evaluation process.
   * Possible values: 'assignment', 'evaluation', 'submission'.
   */
  evaluationStep: 'assignment' | 'evaluation' | 'submission';

  /**
   * The current status of the evaluation.
   * Possible values: 'draft', 'pending-review', 'in-review', 'twilio-rejected', 'twilio-approved', 'compliant', 'noncompliant'.
   */
  status: 'draft' | 'pending-review' | 'in-review' | 'twilio-rejected' | 'twilio-approved' | 'compliant' | 'noncompliant';

  /**
   * The SID of the policy used for evaluation.
   * Optional field.
   */
  policySid?: string;

  /**
   * The SID of the primary profile to which this evaluation is assigned.
   * Optional field.
   */
  primaryProfileSid?: string;

  /**
   * The SID of the assignment linking to the primary profile.
   * Optional field.
   */
  primaryAssignmentSid?: string;

  /**
   * Full evaluation results returned by Twilio.
   * Optional field, may be null or contain full response data.
   */
  evaluationResults?: any;

  /**
   * Validation errors encountered during the evaluation process.
   * Optional field, may contain error details.
   */
  validationErrors?: any;

  /**
   * The date when the profile was submitted for review.
   * Optional field.
   */
  submittedAt?: Date;

  /**
   * The date when the profile was approved.
   * Optional field.
   */
  approvedAt?: Date;

  /**
   * The date when the profile was rejected.
   * Optional field.
   */
  rejectedAt?: Date;

  /**
   * The number of attempts made to evaluate the profile.
   */
  attemptCount: number;

  /**
   * The timestamp of the last evaluation attempt.
   */
  lastAttemptAt: Date;

  /**
   * The date when the evaluation can be retried due to rate limits or other conditions.
   * Optional field.
   */
  retryAfter?: Date;

  /**
   * The compliance score for the profile from Twilio.
   * Range between 0 and 100.
   * Optional field.
   */
  complianceScore?: number;

  /**
   * Whether the evaluation requires manual attention.
   * Default is `false`.
   */
  requiresAttention: boolean;

  /**
   * The timestamp of the last webhook received.
   * Optional field.
   */
  lastWebhookAt?: Date;

  /**
   * The number of webhook status updates received.
   */
  webhookCount: number;

  /**
   * Full response from Twilio API for debugging purposes.
   * Optional field.
   */
  twilioResponse?: any;

  /**
   * Any errors encountered during the evaluation process.
   * Optional field.
   */
  errors?: any;

  /**
   * Internal notes about the evaluation.
   * Optional field.
   */
  notes?: string;

  /**
   * The timestamp when the document was created.
   */
  createdAt: Date;

  /**
   * The timestamp when the document was last updated.
   */
  updatedAt: Date;
}

/**
 * Methods for ProfileEvaluation instance.
 */
export interface IProfileEvaluationMethods {
  /**
   * Determines if the profile evaluation requires attention.
   * @returns {boolean} Whether the evaluation requires manual attention.
   */
  needsAttention(): boolean;

  /**
   * Determines if the profile evaluation is pending review.
   * @returns {boolean} Whether the evaluation is still pending review.
   */
  isPendingReview(): boolean;
}
