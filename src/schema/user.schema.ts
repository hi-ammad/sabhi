
import { Schema } from "mongoose";
import { changePasswordAfter, comparePassword, hashPasswordBeforeSave, hashPasswordBeforeUpdate } from "@/middleware/mongo";
import { EUserRole } from "@/enum";
import type { IUser, IUserMethods, UserModel } from "@/type";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, trim: true },
    phoneNumber: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(EUserRole), required: true },
    facebook_url: { type: String },
    business: { type: Schema.Types.ObjectId, ref: "Business" },
    image: { type: String },
    additional_information: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('added_templates', {
  ref: 'BusinessTemplate',
  localField: '_id',
  foreignField: 'added_by'
});

// Hooks
userSchema.pre("save", hashPasswordBeforeSave);
userSchema.pre("findOneAndUpdate", hashPasswordBeforeUpdate);
userSchema.pre("updateOne", hashPasswordBeforeUpdate);
userSchema.pre("updateMany", hashPasswordBeforeUpdate);

// Methods
userSchema.method("comparePassword", comparePassword);
userSchema.method("changePasswordAfter", changePasswordAfter);

export { userSchema };
