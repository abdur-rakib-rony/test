import Image from "next/image";
import {
  ThumbsUp,
  Ellipsis,
  CircleX,
  Earth,
  MessageSquare,
  Share2,
} from "lucide-react";

const Post = () => {
  return (
    <div className="mt-4 overflow-hidden bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Image
            src="/avatar2.png"
            alt="Memes Group"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold">Memes Group</p>
            <div className="flex items-center">
              <p className="text-sm text-[#393A3B]">1h</p>
              <span className="mx-1 text-[#B0B3B8]">•</span>
              <Earth size={12} color="#B0B3B8" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="ml-auto text-[#393A3B]">
            <Ellipsis size={24} />
          </button>
          <button className="ml-auto text-[#393A3B]">
            <CircleX size={24} />
          </button>
        </div>
      </div>

      <Image
        src="/chanchal.jpg"
        alt="Post image"
        width={500}
        height={300}
        className="h-full w-full object-cover"
      />

      <div className="flex items-center px-4 py-2">
        <div className="flex items-center">
          <span className="inline-block rounded-full">
            <ThumbsUp size={16} />
          </span>
          <span className="ml-2 text-sm text-gray-600">268</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-px">
            39 <MessageSquare size={16} />
          </span>
          <span className="flex items-center gap-px">
            30 <Share2 size={16} />
          </span>
        </div>
      </div>

      <div className="flex border-t border-gray-200">
        <button className="flex-1 py-2 text-gray-600 transition duration-200 hover:bg-gray-100">
          <ThumbsUp className="mr-1 inline-block" size={18} /> Like
        </button>
        <button className="flex-1 py-2 text-gray-600 transition duration-200 hover:bg-gray-100">
          Comment
        </button>
        <button className="flex-1 py-2 text-gray-600 transition duration-200 hover:bg-gray-100">
          Share
        </button>
      </div>
    </div>
  );
};

export default Post;
