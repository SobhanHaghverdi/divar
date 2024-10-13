import { model, Schema } from "mongoose";

const OTPSchema = new Schema(
  {
    code: { type: String, trim: true },
    expiresIn: { type: Number, default: 0 },
  },
  { _id: false, strict: true }
);

const UserSchema = new Schema(
  {
    otp: OTPSchema,
    fullName: { type: String, trim: true },
    isPhoneNumberVerified: { type: Boolean, default: false },
    phoneNumber: { type: String, required: true, trim: true },
  },
  { strict: true, timestamps: true }
);

const User = model("User", UserSchema);

export default User;
