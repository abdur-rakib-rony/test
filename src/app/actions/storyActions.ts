"use server";

import { revalidatePath } from "next/cache";
import Story from "@/models/Story";
import { connectToDB } from "@/lib/db";
import mongoose from "mongoose";
import { getCurrentUser } from "@/lib/auth";

export async function createStory(formData: FormData) {
  await connectToDB();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const story = formData.get("story") as string;
  const backgroundColor = formData.get("backgroundColor") as string;
  const visibility = formData.get("visibility") as "public" | "private";
  const storyType = formData.get("storyType") as "text" | "photo";
  const uploadedImage = formData.get("uploadedImage") as string | null;
  const userId = currentUser.userId;

  let objectIdUserId: mongoose.Types.ObjectId;

  try {
    objectIdUserId = new mongoose.Types.ObjectId(userId);
  } catch (error) {
    throw new Error("Invalid User ID");
  }

  const newStory = new Story({
    userId: objectIdUserId,
    content: story,
    backgroundColor,
    visibility,
    type: storyType,
    imageUrl: uploadedImage,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    reactions: {
      like: { emoji: "👍", count: 0, users: [] },
      love: { emoji: "❤️", count: 0, users: [] },
    },
  });

  await newStory.save();

  revalidatePath("/home");
}

export async function reactToStory(storyId: string, reaction: "like" | "love") {
  await connectToDB();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const story = await Story.findById(storyId);
  if (!story) throw new Error("Story not found");

  let objectIdUserId: mongoose.Types.ObjectId;

  try {
    objectIdUserId = new mongoose.Types.ObjectId(currentUser.userId);
  } catch (error) {
    throw new Error("Invalid User ID");
  }

  const reactionData = story.reactions[reaction];
  const userIndex = reactionData.users.indexOf(objectIdUserId);

  if (userIndex === -1) {
    reactionData.count += 1;
    reactionData.users.push(objectIdUserId);
  } else {
    reactionData.count -= 1;
    reactionData.users.splice(userIndex, 1);
  }

  await story.save();

  revalidatePath("/home");
}

export async function viewStory(storyId: string) {
  await connectToDB();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const story = await Story.findById(storyId);
  if (!story) throw new Error("Story not found");

  let objectIdUserId: mongoose.Types.ObjectId;

  try {
    objectIdUserId = new mongoose.Types.ObjectId(currentUser.userId);
  } catch (error) {
    throw new Error("Invalid User ID");
  }

  if (!story.viewers.includes(objectIdUserId)) {
    story.viewCount += 1;
    story.viewers.push(objectIdUserId);
    await story.save();
  }

  revalidatePath("/home");
}

export async function getAllStories() {
  await connectToDB();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const currentTime = new Date();

  try {
    const stories = await Story.find({
      $or: [
        { visibility: "public" },
        { userId: currentUser.userId, visibility: "private" },
      ],
      expiresAt: { $gt: currentTime },
    })
      .sort({ createdAt: -1 })
      .lean();

    return stories;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw new Error("Failed to fetch stories");
  }
}
