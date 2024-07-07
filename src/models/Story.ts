import mongoose, { Schema, Document } from "mongoose";

export interface IReaction {
  emoji: string;
  count: number;
  users: mongoose.Types.ObjectId[];
}

export interface IStory extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  backgroundColor: string;
  visibility: "public" | "private";
  type: "text" | "photo";
  imageUrl?: string;
  createdAt: Date;
  expiresAt: Date;
  viewCount: number;
  viewers: mongoose.Types.ObjectId[];
  reactions: {
    like: IReaction;
    love: IReaction;
  };
}

const ReactionSchema: Schema = new Schema({
  emoji: { type: String, required: true },
  count: { type: Number, default: 0 },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const StorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String },
  backgroundColor: { type: String },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  type: { type: String, enum: ["text", "photo"], required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  viewCount: { type: Number, default: 0 },
  viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reactions: {
    like: ReactionSchema,
    love: ReactionSchema,
  },
});

StorySchema.index({ userId: 1, createdAt: -1 });
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Story || mongoose.model<IStory>("Story", StorySchema);