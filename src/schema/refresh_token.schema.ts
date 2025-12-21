import type { IRefreshToken, IRefreshTokenMethods } from '@/type';
import { Schema } from 'mongoose';

/**
 * Mongoose schema for the RefreshToken model.
 * This schema defines the structure and instance methods for handling refresh tokens.
 */
const refreshTokenSchema = new Schema<IRefreshToken & IRefreshTokenMethods>({
  token: {
    type: String,
    required: true,
    maxlength: 512
  },
  expiresAt: {
    type: Date,
    required: true
  },
  revoked: {
    type: Boolean,
    required: true,
    default: false
  },
  replacedByToken: {
    type: String,
    maxlength: 512
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt automatically
  collection: 'refresh_tokens',  // Specifies the collection name
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;  // Remove _id field from the response
      return ret;
    }
  }
});

/**
 * Instance method to revoke the refresh token.
 * Sets the `revoked` field to true.
 * @returns {Promise<IRefreshToken>} The updated refresh token document.
 */
refreshTokenSchema.methods.revoke = async function (): Promise<IRefreshToken> {
  this.revoked = true;
  return this.save();
};

/**
 * Instance method to check if the refresh token is expired.
 * Compares the `expiresAt` field with the current date.
 * @returns {boolean} True if the token is expired, otherwise false.
 */
refreshTokenSchema.methods.isExpired = function (): boolean {
  return this.expiresAt < new Date();
};

export { refreshTokenSchema };
