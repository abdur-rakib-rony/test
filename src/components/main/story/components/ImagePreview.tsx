"use client";
import React from "react";
import { X } from "lucide-react";

interface ImagePreviewProps {
  uploadedImage: string;
  handleClearImage: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  uploadedImage,
  handleClearImage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <img
          src={uploadedImage}
          alt="Uploaded Story Image"
          className="max-h-80 rounded-md"
        />
        <button
          onClick={handleClearImage}
          className="absolute -right-4 -top-4 rounded-full bg-white p-2"
        >
          <X color="#307777" size={16} />
        </button>
      </div>
      <div className="relative w-full max-w-md">
        <div className="h-1 rounded-full bg-[#307777]">
          <div className="absolute -top-2 left-0 h-5 w-5 rounded-full border-2 border-[#307777] bg-white"></div>
        </div>
        <p className="mt-2 text-center text-sm font-medium text-gray-600">
          Select photo to crop and rotate
        </p>
      </div>
    </div>
  );
};

export default ImagePreview;
