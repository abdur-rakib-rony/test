"use client";

import React from "react";
import ColorSelector from "./ColorSelector";
import CreateStoryButton from "./CreateStoryButton";

interface StoryOptionsProps {
  story: string;
  setStory: (story: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  visibility: string;
  setVisibility: (visibility: string) => void;
  storyType: "text" | "photo" | null;
  uploadedImage: string | null;
}

const StoryOptions: React.FC<StoryOptionsProps> = ({
  story,
  setStory,
  backgroundColor,
  setBackgroundColor,
  visibility,
  setVisibility,
  storyType,
  uploadedImage,
}) => {
  return (
    <div className="flex gap-4 h-full md:h-[calc(100vh-4rem)] flex-col justify-between overflow-y-auto bg-white p-4 shadow-md md:w-80">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold">
          {storyType ? "Preview" : "Create Your Story"}
        </h1>
        <div>
          <p className="text-sm">Privacy</p>
          <select
            className="mt-2 w-full rounded border p-2"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {storyType === "text" && (
          <>
            <textarea
              className="h-40 rounded border p-2"
              placeholder="Start Typing"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
            <ColorSelector
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />
          </>
        )}
      </div>
      <CreateStoryButton
        story={story}
        backgroundColor={backgroundColor}
        visibility={visibility}
        storyType={storyType}
        uploadedImage={uploadedImage}
      />
    </div>
  );
};

export default StoryOptions;
