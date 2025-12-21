import type { EUserRole } from "@/enum";
import type { Document, Model, Types } from "mongoose";

/**
 * IUserMethods contains all instance methods for a user
 */
export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  changePassword(newPassword: string): Promise<void>;
}

/**
 * IUser represents a user document
 */
export interface IUser extends Document, IUserMethods {
  id: Types.ObjectId;
  name?: string;
  phoneNumber?: string;
  email?: string;
  password: string;
  business: Types.ObjectId | undefined;
  role: EUserRole;
  facebook_url?: string;
  image?: string;
  additional_information?: string;
  password_changed_at: number; // milliseconds

  createdAt: Date;
  updatedAt: Date;
}

/**
 * UserModel type for statics and generics
 */
export type UserModel = Model<IUser, {}, IUserMethods>;
