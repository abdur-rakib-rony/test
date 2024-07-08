import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    backgroundColor: { type: String },
    imageUrl: { type: String },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    type: { type: String, enum: ["text", "photo"], required: true },
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reactions: {
      like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      love: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
