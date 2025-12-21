import { Document, Types } from 'mongoose';

/**
 * Interface representing a User2FA document in MongoDB.
 * 
 * This interface defines the structure of the document for Two-Factor Authentication (2FA)
 * settings for a user. It includes information such as whether SMS-based 2FA is enabled, 
 * and the timestamps for when 2FA was last enabled or disabled.
 * 
 * @interface IUser2FA
 */
export interface IUser2FA extends Document {
  /**
   * Unique identifier for the user, linked to the `User` model.
   * 
   * @type {Types.ObjectId}
   */
  user_id: Types.ObjectId;

  /**
   * Indicates whether SMS-based 2FA is enabled for the user.
   * 
   * @type {boolean}
   * @default false
   */
  sms_enabled: boolean;

  /**
   * The date and time when 2FA was last enabled for the user.
   * This will be `null` if 2FA has never been enabled.
   * 
   * @type {Date | null}
   */
  last_enabled_at: Date | null;

  /**
   * The date and time when 2FA was last disabled for the user.
   * This will be `null` if 2FA has never been disabled.
   * 
   * @type {Date | null}
   */
  last_disabled_at: Date | null;

  /**
   * The date and time when the document was created.
   * 
   * @type {Date}
   */
  created_at: Date;

  /**
   * The date and time when the document was last updated.
   * 
   * @type {Date}
   */
  updated_at: Date;
}

