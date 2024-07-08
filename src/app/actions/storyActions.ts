"use server";
import { revalidatePath } from "next/cache";
import Story from "@/models/Story";
import { connectToDB } from "@/lib/db";
import mongoose, { Types } from "mongoose";
import { getCurrentUser } from "@/lib/auth";
import { loginUserInfo } from "./auth";
import { redirect } from "next/navigation";

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
  redirect("/home");
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

  let objectIdUserId: mongoose.Types.ObjectId;

  try {
    objectIdUserId = new mongoose.Types.ObjectId(currentUser.userId);
  } catch (error) {
    throw new Error("Invalid User ID");
  }

  const updatedStory = await Story.findOneAndUpdate(
    {
      _id: storyId,
      viewers: { $ne: objectIdUserId },
    },
    {
      $inc: { viewCount: 1 },
      $push: { viewers: objectIdUserId },
    },
    { new: true, runValidators: true },
  );

  if (!updatedStory) {
    return await Story.findById(storyId);
  }

  revalidatePath("/home");
  return updatedStory;
}

export async function getSingleStoryById(storyId: string) {
  await connectToDB();
  try {
    const story = await Story.findById(storyId)
      .populate("userId", "firstName lastName email phoneNumber")
      .populate("viewers", "firstName lastName email phoneNumber")
      .populate("reactions.like", "firstName lastName email phoneNumber")
      .populate("reactions.love", "firstName lastName email phoneNumber")
      .lean();

    if (!story) {
      throw new Error("Story not found");
    }

    await viewStory(storyId);

    return JSON.parse(JSON.stringify(story));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch story");
  }
}

export async function getAllStories() {
  await connectToDB();

  const currentUserInfo = await loginUserInfo();
  if (!currentUserInfo) {
    throw new Error("User not authenticated");
  }

  const currentTime = new Date();

  try {
    const stories = await Story.find({
      $or: [
        { visibility: "public" },
        { userId: currentUserInfo.id, visibility: "private" },
      ],
      expiresAt: { $gt: currentTime },
    })
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName email phoneNumber")
      .populate("viewers", "firstName lastName email phoneNumber")
      .populate("reactions.like", "firstName lastName email phoneNumber")
      .populate("reactions.love", "firstName lastName email phoneNumber")
      .lean();

    return JSON.parse(JSON.stringify(stories));
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw new Error("Failed to fetch stories");
  }
}
