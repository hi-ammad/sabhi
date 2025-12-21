
// interfaces/slimcd_business_details.interface.ts

import { Document, Types } from 'mongoose';

/**
 * Interface representing a SlimcdBusinessDetails document in MongoDB.
 * This document links specific SlimCD business details to a given business.
 * 
 * @interface ISlimcdBusinessDetails
 * @property {Types.ObjectId} business_id - Reference to the Business model
 * @property {string} username - SlimCD username for the business
 * @property {string} site_id - SlimCD site ID associated with the business
 * @property {number} client_id - SlimCD client ID
 * @property {number} form_id - SlimCD form ID for the business
 * @property {number} price_id - SlimCD price ID for the business
 * @property {Date} created_at - Timestamp of when the document was created
 * @property {Date} updated_at - Timestamp of the last update to the document
 */
export interface ISlimcdBusinessDetails extends Document {
  business_id: Types.ObjectId;
  username: string;
  site_id: string;
  client_id: number;
  form_id: number;
  price_id: number;
  created_at: Date;
  updated_at: Date;
}
