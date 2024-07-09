const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReactionSchema = new Schema({
  emoji: { type: String, required: true },
  count: { type: Number, default: 0 },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const StorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  backgroundColor: { type: String, default: "#FFFFFF" },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  type: { type: String, enum: ["text", "photo"], required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  viewCount: { type: Number, default: 0 },
  viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reactions: {
    like: {
      type: ReactionSchema,
      default: () => ({ emoji: "like", count: 0, users: [] }),
    },
    love: {
      type: ReactionSchema,
      default: () => ({ emoji: "love", count: 0, users: [] }),
    },
  },
});

StorySchema.index({ userId: 1, createdAt: -1 });
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
