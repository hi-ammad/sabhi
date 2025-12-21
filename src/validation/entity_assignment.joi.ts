
import Joi from 'joi';

/**
 * Joi schema to validate the creation of an EntityAssignment.
 */
export const createEntityAssignmentSchema = Joi.object({
  entity_assignment_sid: Joi.string().allow(null), // Optional Twilio SID for entity assignment
  customer_profile_sid: Joi.string().required(), // CustomerProfile SID
  object_sid: Joi.string().required(), // SID of the object being assigned
  object_type: Joi.string().valid('EndUser', 'SupportingDocument', 'Address', 'CustomerProfile').required(),
  end_user_type: Joi.string().valid(
    'customer_profile_business_information',
    'authorized_representative_1',
    'authorized_representative_2',
    'us_a2p_messaging_profile_information'
  ).allow(null),
  assignment_type: Joi.string().valid('business_info', 'authorized_rep', 'address_document', 'profile_linking').required(),
  status: Joi.string().valid('active', 'inactive', 'error').default('active'),
  end_user_id: Joi.string().allow(null), // Reference to EndUser (optional)
  supporting_document_id: Joi.string().allow(null), // Reference to SupportingDocument (optional)
  address_id: Joi.string().allow(null), // Reference to Address (optional)
  assigned_at: Joi.date().default(Date.now), // Timestamp when the assignment was created
  twilio_response: Joi.object().allow(null), // Full response from Twilio API (optional)
  errors: Joi.object().allow(null), // Errors encountered during the assignment process (optional)
});

/**
 * Joi schema to validate the update of an EntityAssignment.
 */
export const updateEntityAssignmentSchema = createEntityAssignmentSchema.fork(
  Object.keys(createEntityAssignmentSchema.describe().keys).filter(key => key !== 'entity_assignment_sid'),
  schema => schema.optional()
);
