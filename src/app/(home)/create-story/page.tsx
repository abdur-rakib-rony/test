"use client";
import React, { useState, useRef } from "react";
import StoryOptions from "@/components/main/story/components/StoryOptions";
import StoryPreview from "@/components/main/story/components/StoryPreview";

const StoryCreator: React.FC = () => {
  const [story, setStory] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("blue");
  const [visibility, setVisibility] = useState<string>("public");
  const [storyType, setStoryType] = useState<"text" | "photo" | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setStoryType("photo");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setStoryType(null);
    setBackgroundColor("blue");
    setStory("");
    setVisibility("public");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <StoryOptions
        story={story}
        setStory={setStory}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        visibility={visibility}
        setVisibility={setVisibility}
        storyType={storyType}
        uploadedImage={uploadedImage}
      />
      <StoryPreview
        storyType={storyType}
        uploadedImage={uploadedImage}
        handleClearImage={handleClearImage}
        backgroundColor={backgroundColor}
        story={story}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        setStoryType={setStoryType}
      />
    </div>
  );
};

export default StoryCreator;
