// src/types/entityAssignmentTypes.ts

import { Types } from 'mongoose';

/**
 * @interface IEntityAssignment
 * Represents an Entity Assignment in the database.
 * 
 * @property {string} entity_assignment_sid - Unique SID for EntityAssignment from Twilio.
 * @property {string} customer_profile- SID of the associated customer profile.
 * @property {string} business - Reference to the Business associated with the assignment.
 * @property {string} address - Reference to the Address associated with the assignment.
 * @property {string} supporting_document - Reference to the SupportingDocument associated with the assignment.
 * @property {string} object_sid - SID of the object being assigned (e.g., EndUser, Address, etc.).
 * @property {string} object_type - Type of the object being assigned (e.g., EndUser).
 * @property {string} assignment_type - Context or type of the assignment.
 * @property {string} status - Current status of the assignment (active, inactive, error).
 * @property {string} end_user_id - Reference to the local EndUser record (if applicable).
 * @property {string} supporting_document_id - Reference to the local SupportingDocument record (if applicable).
 * @property {string} address_id - Reference to the local Address record (if applicable).
 * @property {Date} assigned_at - Timestamp for when the assignment was created.
 * @property {object} twilio_response - Full response from Twilio API for debugging.
 * @property {object} errors - Any errors encountered during the assignment process.
 */
export interface IEntityAssignment {
  entity_assignment_sid?: string;
  customer_profile: Types.ObjectId;
  business: Types.ObjectId;
  address: Types.ObjectId;
  supporting_document: Types.ObjectId;
  object_sid: string;
  object_type: 'EndUser' | 'SupportingDocument' | 'Address' | 'CustomerProfile';
  end_user_type?: 'customer_profile_business_information' | 'authorized_representative_1' | 'authorized_representative_2' | 'us_a2p_messaging_profile_information';
  assignment_type: 'business_info' | 'authorized_rep' | 'address_document' | 'profile_linking';
  status: 'active' | 'inactive' | 'error';
  end_user?: Types.ObjectId;
  supporting_document_id?: Types.ObjectId;
  address_id?: Types.ObjectId;
  assigned_at: Date;
  twilio_response?: object;
  errors?: object;
}

