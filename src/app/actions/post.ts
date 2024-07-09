"use server";
import { revalidatePath } from "next/cache";
import Post from "@/models/Post";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function createPost(formData: FormData) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const user = await User.findOne({ _id: currentUser.userId });
  if (!user) throw new Error("User not found");

  const content = formData.get("content") as string;
  const imageDataUrl = formData.get("image") as string | null;
  const videoDataUrl = formData.get("video") as string | null;
  const userId = currentUser.userId;

  let imageUrl = null;
  let videoUrl = null;

  if (imageDataUrl) {
    imageUrl = await uploadFile(imageDataUrl);
  }

  if (videoDataUrl) {
    videoUrl = await uploadFile(videoDataUrl);
  }

  const post = new Post({
    userId,
    content,
    imageUrl,
    videoUrl,
  });

  await post.save();
  revalidatePath("/home");
}

export async function deletePost(postId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const user = await User.findOne({ _id: currentUser.userId });
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  if (post.userId.toString() !== user._id.toString()) {
    throw new Error("Not authorized to delete this post");
  }

  await Post.findByIdAndDelete(postId);
  revalidatePath("/home");
}

export async function reactToPost(postId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const user = await User.findOne({ _id: currentUser.userId });
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const userIdString = user._id.toString();
  const likeIndex = post.likes.findIndex(
    (id: string) => id.toString() === userIdString,
  );

  if (likeIndex > -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    post.likes.push(user._id);
  }

  await post.save();
  revalidatePath("/home");
}

export async function commentOnPost(postId: string, content: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const user = await User.findOne({ _id: currentUser.userId });
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const userId = currentUser.userId;

  // const hasCommented = post.comments.some(
  //   (comment: any) => comment.userId.toString() === userId.toString(),
  // );

  // if (hasCommented) {
  //   throw new Error("You have already commented on this post");
  // }

  post.comments.push({
    userId,
    content,
  });

  await post.save();
  revalidatePath("/home");
}

export async function getAllPosts(page = 1, limit = 10) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "firstName lastName email phoneNumber")
      .populate("comments.userId", "firstName lastName email phoneNumber")
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts");
  }
}

export async function deleteComment(postId: string, commentId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const user = await User.findOne({ _id: currentUser.userId });
  if (!user) throw new Error("User not found");

  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const comment = post.comments.find(
    (comment: any) => comment._id.toString() === commentId,
  );

  if (!comment) throw new Error("Comment not found");

  if (comment.userId.toString() !== user._id.toString()) {
    throw new Error("Not authorized to delete this comment");
  }

  post.comments = post.comments.filter(
    (comment: any) => comment._id.toString() !== commentId,
  );
  await post.save();

  revalidatePath("/home");
}

export async function uploadFile(dataUrl: string): Promise<string> {
  return dataUrl;
}
