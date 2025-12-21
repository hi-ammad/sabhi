import { Schema } from 'mongoose';

/**
 * Mongoose schema for the A2P EndUser model.
 * Represents an EndUser of type 'us_a2p_messaging_profile_information' for Trust Products,
 * containing company information required for A2P messaging compliance.
 */
const a2pEndUserSchema = new Schema({
  // Unique identifier for the business the A2P EndUser belongs to.
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business', // Assuming there's a 'Business' model that this references
    required: true,
  },

  // Link to TrustProduct
  trustProductId: {
    type: Schema.Types.ObjectId,
    ref: 'TrustProduct', // Assuming there's a 'TrustProduct' model that this references
    default: null,
  },

  // Twilio EndUser SID (Step 2.2)
  endUserSid: {
    type: String,
    unique: true,
    match: /^IT[0-9a-fA-F]{32}$/, // Ensures it matches the pattern
    default: null,
  },

  // Human-readable name for the EndUser
  friendlyName: {
    type: String,
    required: true,
  },

  // EndUser type (Always 'us_a2p_messaging_profile_information' for A2P)
  type: {
    type: String,
    required: true,
    default: 'us_a2p_messaging_profile_information',
  },

  // Company type classification
  companyType: {
    type: String,
    enum: ['private', 'public', 'nonprofit', 'government', 'other'],
    required: true,
  },

  // Public company info (Only required if companyType is 'public')
  stockExchange: {
    type: String,
    default: null,
  },

  stockTicker: {
    type: String,
    default: null,
  },

  // Brand contact email for 2FA
  brandContactEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },

  // Additional company information
  companyWebsite: {
    type: String,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL'],
    default: null,
  },

  // Industry classification
  industry: {
    type: String,
    default: null,
  },

  // Description of the company and its use case for messaging
  description: {
    type: String,
    default: null,
  },

  // EndUser status
  status: {
    type: String,
    enum: ['draft', 'pending-review', 'in-review', 'approved', 'rejected', 'expired'],
    default: 'draft',
  },

  // Validation errors returned from Twilio
  validationErrors: {
    type: Schema.Types.Mixed, // Can store any object or array of validation errors
    default: null,
  },

  // Workflow tracking
  attachedAt: {
    type: Date,
    default: null,
  },

  // Entity Assignment SID from TrustProduct attachment
  entityAssignmentSid: {
    type: String,
    default: null,
  },

  // Store Twilio attributes as JSON
  attributes: {
    type: Schema.Types.Mixed, // This allows storing any JSON object from Twilio
    default: null,
  },

  // Store full Twilio API responses for debugging
  twilioResponse: {
    type: Schema.Types.Mixed,
    default: null,
  },

  // Validation history
  validationHistory: {
    type: [Schema.Types.Mixed], // Array of validation history objects
    default: [],
  },

}, {
  timestamps: true,
  versionKey: false, // Disable version key (__v)
});

// Instance method to validate public company information (if public)
a2pEndUserSchema.methods.validatePublicCompanyInfo = function () {
  if (this.companyType === 'public') {
    if (!this.stockExchange || !this.stockTicker) {
      throw new Error('Stock exchange and ticker are required for public companies');
    }
  }
};

// Instance method to generate Twilio attributes
a2pEndUserSchema.methods.generateTwilioAttributes = function () {
  const attributes: { [key: string]: any } = {
    company_type: this.companyType,
    brand_contact_email: this.brandContactEmail,
  };

  // Add stock info for public companies
  if (this.companyType === 'public') {
    attributes.stock_exchange = this.stockExchange;
    attributes.stock_ticker = this.stockTicker;
  }

  // Add optional fields if present
  if (this.industry) attributes.industry = this.industry;
  if (this.companyWebsite) attributes.company_website = this.companyWebsite;
  if (this.description) attributes.description = this.description;

  return attributes;
};

export { a2pEndUserSchema }
