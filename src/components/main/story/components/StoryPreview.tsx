"use client";
import React from "react";
import StoryTypeSelector from "./StoryTypeSelector";
import ImagePreview from "./ImagePreview";
import TextStoryPreview from "./TextStoryPreview";

interface StoryPreviewProps {
  storyType: "text" | "photo" | null;
  uploadedImage: string | null;
  handleClearImage: () => void;
  backgroundColor: string;
  story: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setStoryType: (type: "text" | "photo" | null) => void;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  storyType,
  uploadedImage,
  handleClearImage,
  backgroundColor,
  story,
  fileInputRef,
  handleImageUpload,
  setStoryType,
}) => {
  return (
    <div className="w-full rounded-md bg-white p-4 md:m-10">
      <h2 className="mb-4 text-lg font-semibold">
        {storyType ? "Preview" : "Select Story Type"}
      </h2>
      <div className="flex h-full items-center justify-center space-x-4 rounded-md bg-gray-200 p-10">
        {storyType ? (
          storyType === "photo" && uploadedImage ? (
            <ImagePreview
              uploadedImage={uploadedImage}
              handleClearImage={handleClearImage}
            />
          ) : (
            <TextStoryPreview
              backgroundColor={backgroundColor}
              story={story}
              handleClearImage={handleClearImage}
            />
          )
        ) : (
          <StoryTypeSelector
            fileInputRef={fileInputRef}
            setStoryType={setStoryType}
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default StoryPreview;
