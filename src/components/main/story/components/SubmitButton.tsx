"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex w-full items-center justify-center rounded bg-teal-600 p-2 text-white disabled:bg-teal-300"
      disabled={pending}
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
