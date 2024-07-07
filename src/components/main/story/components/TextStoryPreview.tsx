"use client";
import React from "react";
import { X } from "lucide-react";

interface TextStoryPreviewProps {
  backgroundColor: string;
  story: string;
  handleClearImage?: () => void;
}

const TextStoryPreview: React.FC<TextStoryPreviewProps> = ({
  backgroundColor,
  story,
  handleClearImage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <button
          className="flex aspect-[9/16] w-48 flex-col items-center justify-center overflow-hidden rounded-lg text-white transition-transform hover:scale-105"
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          <span className="mt-2.5 max-w-36 break-words text-sm">{story}</span>
        </button>
        <button
          onClick={handleClearImage}
          className="absolute -right-4 -top-4 rounded-full bg-white p-2"
        >
          <X color="#307777" size={16} />
        </button>
      </div>
    </div>
  );
};

export default TextStoryPreview;
