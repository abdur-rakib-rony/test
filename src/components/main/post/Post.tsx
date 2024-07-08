"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ThumbsUp,
  Ellipsis,
  CircleX,
  Earth,
  MessageSquare,
  Share2,
} from "lucide-react";
import { deletePost, reactToPost, commentOnPost } from "@/app/actions/post";

interface CurrentUserData {
  userId: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female" | "other";
  phoneNumber: string;
  user_role: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
}

interface Comment {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
}

interface PostData {
  _id: string;
  userId: User;
  content: string;
  imageUrl?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

interface PostProps {
  post: PostData;
}

const Post = ({ post }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [currentUser, setCurrentUser] = useState<CurrentUserData | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = { userId: "" };
      if (user) {
        setCurrentUser(user);
        setIsLiked(post.likes.includes(user.userId));
      }
    };
    fetchCurrentUser();
  }, [post.likes]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      await reactToPost(post._id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.error("Failed to react to post:", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim() && currentUser) {
      try {
        const newCommentData = await commentOnPost(post._id, commentContent);
        const newComment: Comment = {
          _id: Date.now().toString(),
          userId: currentUser.userId,
          content: commentContent,
          createdAt: new Date().toISOString(),
        };
        setComments([...comments, newComment]);
        setCommentContent("");
      } catch (error) {
        console.error("Failed to comment on post:", error);
      }
    }
  };

  return (
    <div className="mt-4 overflow-hidden bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image
            src="/avatar2.png"
            alt={`${post.userId.firstName} ${post.userId.lastName}`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold">{`${post.userId.firstName} ${post.userId.lastName}`}</p>
            <div className="flex items-center">
              <p className="text-sm text-[#393A3B]">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <span className="mx-1 text-[#B0B3B8]">•</span>
              <Earth size={12} color="#B0B3B8" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="ml-auto text-[#393A3B]">
            <Ellipsis size={24} />
          </button>
          <button className="ml-auto text-[#393A3B]" onClick={handleDelete}>
            <CircleX size={24} />
          </button>
        </div>
      </div>

      <p className="px-4 py-2">{post.content}</p>

      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt="Post image"
          width={500}
          height={300}
          className="h-full w-full object-cover"
        />
      )}

      <div className="flex items-center px-4 py-2">
        <div className="flex items-center">
          <span className="inline-block rounded-full">
            <ThumbsUp size={16} color={isLiked ? "#1877F2" : "currentColor"} />
          </span>
          <span className="ml-2 text-sm text-gray-600">{likesCount}</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-px">
            {comments.length} <MessageSquare size={16} />
          </span>
          <span className="flex items-center gap-px">
            30 <Share2 size={16} />
          </span>
        </div>
      </div>

      <div className="flex border-t border-gray-200">
        <button
          className={`flex-1 py-2 transition duration-200 hover:bg-gray-100 ${isLiked ? "text-[#1877F2]" : "text-gray-600"}`}
          onClick={handleLike}
        >
          <ThumbsUp className="mr-1 inline-block" size={18} /> Like
        </button>
        <button className="flex-1 py-2 text-gray-600 transition duration-200 hover:bg-gray-100">
          Comment
        </button>
        <button className="flex-1 py-2 text-gray-600 transition duration-200 hover:bg-gray-100">
          Share
        </button>
      </div>
      {/*
      <form onSubmit={handleComment} className="px-4 py-2">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full rounded-full border border-gray-300 px-4 py-2"
        />
      </form>

      <div className="px-4 py-2">
        {comments.map((comment) => (
          <div key={comment._id} className="mb-2">
            <strong>{comment.userId}</strong>: {comment.content}
          </div>
        ))}
      </div>*/}
    </div>
  );
};

export default Post;
