import { EUserStatus } from "@/enum";
import type { IBusinessAdmin } from "@/type";
import { Schema } from "mongoose";

/**
 * Business Admin Schema
 */
const businessAdminSchema: Schema<IBusinessAdmin> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true
    },
    status: {
      type: String,
      enum: Object.values(EUserStatus),
      default: EUserStatus.ACTIVE
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      }
    }
  }
)
export { businessAdminSchema };
