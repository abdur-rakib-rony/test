"use client";
import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThumbsUp,
  Ellipsis,
  CircleX,
  Earth,
  MessageSquare,
  Share2,
  SendHorizontal,
  Trash2,
} from "lucide-react";
import {
  deletePost,
  reactToPost,
  commentOnPost,
  deleteComment,
} from "@/app/actions/post";
import moment from "moment";
import { Loader2 } from "lucide-react";

const Post = ({ post, currentUser }: any) => {
  const [isLiked, setIsLiked] = useState<any>(false);
  const [likesCount, setLikesCount] = useState<any>(post.likes.length);
  const [commentContent, setCommentContent] = useState<any>("");
  const [comments, setComments] = useState<any>(post.comments);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
      } catch (error: any) {
        console.error("Failed to delete post:", error.message);
      }
    }
  };

  const handleLike = async () => {
    try {
      await reactToPost(post._id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    } catch (error: any) {
      console.error("Failed to react to post:", error.message);
    }
  };

  const handleComment = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (!commentContent.trim()) {
      setIsLoading(false);
      return;
    }

    try {
      await commentOnPost(post._id, commentContent);
      const newComment = {
        content: commentContent,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setCommentContent("");
    } catch (error: any) {
      console.error("Failed to comment on post:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: any) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(post._id, commentId);
        setComments(
          comments.filter((comment: any) => comment._id !== commentId),
        );
      } catch (error: any) {
        console.error("Failed to delete comment:", error.message);
      }
    }
  };

  return (
    <div className="mt-4 overflow-hidden bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-semibold">{`${post.userId.firstName} ${post.userId.lastName}`}</p>
            <div className="flex items-center">
              <p className="text-xs font-medium text-[#757575]">
                {moment(post.createdAt).fromNow()}
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
            <ThumbsUp size={16} />
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

      <form
        onSubmit={handleComment}
        className="mt-2 flex items-center justify-between gap-4 rounded-full bg-gray-50 px-4 py-2"
      >
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full rounded-full border px-4 py-2 text-sm text-gray-600 outline-none"
        />
        <button className="flex items-center justify-center rounded-md bg-[#307777] p-2 text-sm text-white">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </form>

      <div className="px-4 py-2">
        {comments?.length > 0 && (
          <div className="space-y-4">
            <h1 className="text-sm font-semibold">All Comments</h1>
            {comments.map((comment: any) => (
              <div className="flex items-start" key={comment._id}>
                <Avatar className="mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="flex-grow rounded-md bg-[#F0F2F5] p-2.5">
                  <h2 className="text-sm font-semibold text-gray-800">
                    {currentUser.fullname ||
                      `${comment?.userId?.firstName || ""} ${comment?.userId?.lastName || ""}`}
                  </h2>
                  <p className="mt-1 text-xs text-gray-600">
                    {comment.content}
                  </p>
                </div>
                {/* <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
