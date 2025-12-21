// interfaces/a2pEndUser.interface.ts

import { Document, Types } from 'mongoose';

/**
 * Interface representing an A2P EndUser document in the database.
 *
 * This interface defines the structure for an EndUser of type 'us_a2p_messaging_profile_information'
 * for Trust Products. It contains company information required for A2P messaging compliance
 * as specified by Twilio's Trust Product.
 *
 * @interface IA2PEndUser
 */
export interface IA2PEndUser extends Document {
  /**
   * Unique identifier for the business the A2P EndUser belongs to.
   * 
   * @type {Types.ObjectId}
   */
  businessId: Types.ObjectId;

  /**
   * Unique identifier for the TrustProduct this EndUser is linked to.
   * 
   * @type {Types.ObjectId | null}
   */
  trustProductId: Types.ObjectId | null;

  /**
   * The unique identifier for this A2P EndUser in Twilio's system.
   * 
   * @type {string | null}
   */
  endUserSid: string | null;

  /**
   * A human-readable name for the EndUser (messaging profile).
   * 
   * @type {string}
   */
  friendlyName: string;

  /**
   * The type of the EndUser, which should always be 'us_a2p_messaging_profile_information' for A2P.
   * 
   * @type {string}
   * @default 'us_a2p_messaging_profile_information'
   */
  type: 'us_a2p_messaging_profile_information';

  /**
   * Type of the company (e.g., private, public, nonprofit).
   * 
   * @type {string}
   */
  companyType: 'private' | 'public' | 'nonprofit' | 'government' | 'other';

  /**
   * The stock exchange where the company is listed (only required if companyType is 'public').
   * 
   * @type {string | null}
   */
  stockExchange: string | null;

  /**
   * The stock ticker symbol (only required if companyType is 'public').
   * 
   * @type {string | null}
   */
  stockTicker: string | null;

  /**
   * Email address for brand verification and 2FA.
   * 
   * @type {string}
   */
  brandContactEmail: string;

  /**
   * The company's website URL.
   * 
   * @type {string | null}
   */
  companyWebsite: string | null;

  /**
   * Industry classification for the company.
   * 
   * @type {string | null}
   */
  industry: string | null;

  /**
   * Description of the company and its messaging use case.
   * 
   * @type {string | null}
   */
  description: string | null;

  /**
   * The current status of the A2P EndUser.
   * 
   * @type {string}
   * @default 'draft'
   */
  status: 'draft' | 'pending-review' | 'in-review' | 'approved' | 'rejected' | 'expired';

  /**
   * Any validation errors returned from Twilio for this EndUser.
   * 
   * @type {object | null}
   */
  validationErrors: object | null;

  /**
   * Timestamp when this EndUser was attached to a TrustProduct.
   * 
   * @type {Date | null}
   */
  attachedAt: Date | null;

  /**
   * SID of the entity assignment when this EndUser was attached to a TrustProduct.
   * 
   * @type {string | null}
   */
  entityAssignmentSid: string | null;

  /**
   * Full attributes object that was sent to Twilio for this EndUser.
   * 
   * @type {object | null}
   */
  attributes: object | null;

  /**
   * Latest Twilio API response for debugging.
   * 
   * @type {object | null}
   */
  twilioResponse: object | null;

  /**
   * History of validation attempts and their results.
   * 
   * @type {object[]}
   */
  validationHistory: object[];

  /**
   * The timestamp when the document was created.
   * 
   * @type {Date}
   */
  createdAt: Date;

  /**
   * The timestamp when the document was last updated.
   * 
   * @type {Date}
   */
  updatedAt: Date;
}
