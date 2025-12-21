// validations/refresh_token.joi.ts

import Joi from 'joi';

/**
 * Joi schema for creating a new RefreshToken.
 * This schema validates the input data for creating a refresh token.
 */
export const createRefreshTokenSchema = Joi.object({
  token: Joi.string().max(512).required(),
  expiresAt: Joi.date().required(),
  revoked: Joi.boolean().default(false),
  replacedByToken: Joi.string().max(512).optional(),
  userId: Joi.string().required(),
});

/**
 * Joi schema for updating a RefreshToken.
 * This schema is used for updates to the refresh token document.
 */
export const updateRefreshTokenSchema = Joi.object({
  token: Joi.string().max(512).optional(),
  expiresAt: Joi.date().optional(),
  revoked: Joi.boolean().optional(),
  replacedByToken: Joi.string().max(512).optional(),
});

