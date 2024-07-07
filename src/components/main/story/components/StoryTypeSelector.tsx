"use client";
import React from "react";
import Image from "next/image";

interface StoryTypeSelectorProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  setStoryType: (type: "text" | "photo" | null) => void;
}

const StoryTypeSelector: React.FC<StoryTypeSelectorProps> = ({
  fileInputRef,
  setStoryType,
}) => {
  const handlePhotoStoryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <button
        className="flex aspect-[9/16] w-48 flex-col items-center justify-center rounded-lg bg-gradient-to-b from-pink-400 to-pink-600 text-white transition-transform hover:scale-105"
        onClick={handlePhotoStoryClick}
      >
        <div className="rounded-full bg-white p-4">
          <Image
            src="/story-image1.png"
            alt="story image"
            width={24}
            height={24}
            className="text-[#307777]"
          />
        </div>
        <span className="mt-2.5 text-sm">Create Your Photo Story</span>
      </button>
      <button
        className="flex aspect-[9/16] w-48 flex-col items-center justify-center rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 text-white transition-transform hover:scale-105"
        onClick={() => setStoryType("text")}
      >
        <div className="rounded-full bg-white p-4">
          <Image
            src="/story-image2.png"
            alt="story image"
            width={24}
            height={24}
            className="text-[#307777]"
          />
        </div>
        <span className="mt-2.5 text-sm">Create Your Text Story</span>
      </button>
    </>
  );
};

export default StoryTypeSelector;
