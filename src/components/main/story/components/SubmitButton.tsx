"use client";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface CreateSubmitButtonProps {
  story: string;
  backgroundColor: string;
  storyType: "text" | "photo" | null;
  uploadedImage: string | null;
}

const SubmitButton: FC<CreateSubmitButtonProps> = ({
  story,
  backgroundColor,
  storyType,
  uploadedImage,
}) => {
  const { pending } = useFormStatus();

  const isDisabled =
    pending ||
    (storyType === "text" && (!backgroundColor || !story)) ||
    (storyType === "photo" && !uploadedImage) ||
    !storyType;

  return (
    <button
      type="submit"
      className={`flex w-full items-center justify-center rounded p-2 text-white ${
        isDisabled ? "cursor-not-allowed bg-gray-400" : "bg-[#307777]"
      }`}
      disabled={isDisabled}
    >
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Create Story"
      )}
    </button>
  );
};

export default SubmitButton;
