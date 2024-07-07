import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  user_role: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  phoneNumber: { type: String, required: true },
  user_role: { type: String, default: "1" },
  birthMonth: { type: String, required: true },
  birthDay: { type: String, required: true },
  birthYear: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
