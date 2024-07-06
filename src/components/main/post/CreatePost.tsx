import Image from "next/image";
import { FC } from "react";

const CreatePost: FC = () => {
  return (
    <div className="mb-4 bg-white">
      <div className="flex items-center gap-4 border-b-2 border-gray-100 p-4">
        <div className="relative inline-block">
          <Image
            src="/avatar2.png"
            alt="User"
            width={50}
            height={50}
            className="h-14 w-14 rounded-full border"
          />
        </div>

        <input
          type="text"
          placeholder="What's on your mind, Shanto?"
          className="flex-grow rounded-full bg-gray-100 py-3 pl-4 text-sm outline-none placeholder:text-[#B0B3B8]"
        />
      </div>
      <div className="flex items-center justify-around p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
          <Image src="/camera.png" alt="camera logo" width={24} height={24} />{" "}
          Live Video
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
          <Image src="/photos.png" alt="photos logo" width={24} height={24} />{" "}
          Photo/Video
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
          <Image
            src="/happy_emoji.png"
            alt="happy emoji logo"
            width={24}
            height={24}
          />{" "}
          Feeling/activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
