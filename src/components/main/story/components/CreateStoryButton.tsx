import { createStory } from "@/app/actions/storyActions";

interface CreateStoryButtonProps {
  story: string;
  backgroundColor: string;
  visibility: string;
  storyType: "text" | "photo" | null;
  uploadedImage: string | null;
}

const CreateStoryButton: React.FC<CreateStoryButtonProps> = ({
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
      <button
        type="submit"
        className="w-full rounded bg-teal-600 p-2 text-white"
      >
        Create Story
      </button>
    </form>
  );
};

export default CreateStoryButton;
