import { Document, Types } from 'mongoose';

/**
 * Interface for RefreshToken Document.
 * Represents a refresh token used for authentication in the system.
 */
export interface IRefreshToken extends Document {
  /**
   * The refresh token string.
   */
  token: string;

  /**
   * The expiration date of the refresh token.
   */
  expiresAt: Date;

  /**
   * Boolean flag to indicate if the token has been revoked.
   */
  revoked: boolean;

  /**
   * If this token was replaced by another token, it holds the replaced token's value.
   */
  replacedByToken?: string;

  /**
   * The associated user ID this refresh token belongs to.
   * This is a reference to the User model.
   */
  userId: Types.ObjectId;

  /**
   * The date the refresh token was created.
   */
  createdAt: Date;

  /**
   * The date the refresh token was last updated.
   */
  updatedAt: Date;
}

/**
 * Methods for RefreshToken instance.
 */
export interface IRefreshTokenMethods {
  /**
   * Revokes the refresh token.
   * This method updates the revoked status to true.
   * @returns {Promise<IRefreshToken>} The updated refresh token document.
   */
  revoke(): Promise<IRefreshToken>;

  /**
   * Checks if the refresh token is expired based on the current time.
   * @returns {boolean} True if the token is expired, otherwise false.
   */
  isExpired(): boolean;
}

