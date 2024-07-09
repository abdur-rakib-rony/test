import { FC } from "react";
import { createStory } from "@/app/actions/storyActions";
import SubmitButton from "./SubmitButton";

interface CreateStoryButtonProps {
  story: string;
  backgroundColor: string;
  visibility: string;
  storyType: "text" | "photo" | null;
  uploadedImage: string | null;
}

const CreateStoryButton: FC<CreateStoryButtonProps> = ({
  story,
  backgroundColor,
  visibility,
  storyType,
  uploadedImage,
}) => {
  return (
    <form action={createStory}>
      <input type="hidden" name="story" value={story} />
      <input type="hidden" name="backgroundColor" value={backgroundColor} />
      <input type="hidden" name="visibility" value={visibility} />
      <input type="hidden" name="storyType" value={storyType || ""} />
      <input type="hidden" name="uploadedImage" value={uploadedImage || ""} />
      <SubmitButton
        story={story}
        backgroundColor={backgroundColor}
        storyType={storyType}
        uploadedImage={uploadedImage}
      />
    </form>
  );
};

export default CreateStoryButton;
