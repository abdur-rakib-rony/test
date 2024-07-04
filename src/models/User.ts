import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  birthMonth: { type: String, required: true },
  birthDay: { type: String, required: true },
  birthYear: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
