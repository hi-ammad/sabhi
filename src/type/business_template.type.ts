// src/types/businessTemplateTypes.ts

import { Types } from 'mongoose';

/**
 * @interface IBusinessTemplate
 * Represents a business template document in MongoDB.
 * 
 * @property {Types.ObjectId} business_id - The business associated with the template (MongoDB ObjectId).
 * @property {string} template_id - The Twilio Content SID associated with the template.
 * @property {string} [template_name] - Friendly name of the template for easier identification.
 * @property {Types.ObjectId} [added_by] - The user ID who added the template.
 * @property {boolean} is_active - Whether the template is active for the business.
 * @property {Date} created_at - The timestamp when the template was created.
 * @property {Date} updated_at - The timestamp when the template was last updated.
 */
export interface IBusinessTemplate {
  business_id: Types.ObjectId;
  template_id: string;
  template_name?: string;
  added_by?: Types.ObjectId;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

