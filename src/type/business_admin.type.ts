
import type { EUserStatus } from "@/enum";
import { Types } from "mongoose";

/**
 * @interface IBusinessAdmin
 * Represents the BusinessAdmin document in MongoDB
 */
export interface IBusinessAdmin {
  id: Types.ObjectId;
  user: Types.ObjectId;
  business: Types.ObjectId;
  status: EUserStatus;
  created_at?: Date;
  updated_at?: Date;
}
