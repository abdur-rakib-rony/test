"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createPost } from "@/app/actions/post";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, SendHorizontal } from "lucide-react";

const schema = z.object({
  content: z.string().min(1, "Post content is required"),
});

type FormData = z.infer<typeof schema>;

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "image") {
          setUploadedImage(reader.result as string);
        } else {
          setUploadedVideo(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("content", data.content);
    if (uploadedImage) formData.append("image", uploadedImage);
    if (uploadedVideo) formData.append("video", uploadedVideo);

    try {
      await createPost(formData);
      reset();
      formRef.current?.reset();
      setUploadedImage(null);
      setUploadedVideo(null);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 bg-white">
        {errors.content && (
          <div className="mb-4 flex items-center justify-center rounded-md bg-red-500 py-2 md:mb-2">
            <span className="text-sm text-white">
              {errors.content.message}!
            </span>
          </div>
        )}
        <div className="mt-2 flex items-center gap-2 md:mt-0 md:gap-4 md:p-4">
          <div className="relative inline-block">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="relative flex-grow">
            <input
              {...register("content")}
              placeholder="What's on your mind?"
              className="w-full rounded-full bg-gray-100 py-3 pl-2 pr-20 text-sm outline-none placeholder:text-[#B0B3B8] md:pl-4"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full border-none bg-[#307777] p-2 text-sm text-white"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal size={16} />
              )}
            </button>
          </div>
        </div>

        <hr className="hidden md:block" />
        <div className="flex items-center justify-between p-4 md:justify-around">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
            <Image src="/photos.png" alt="photos logo" width={24} height={24} />
            Photo
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileUpload(e, "image")}
            />
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
            <Image src="/camera.png" alt="camera logo" width={24} height={24} />
            Video
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileUpload(e, "image")}
            />
          </label>
          {uploadedImage && (
            <div className="flex items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
              <Image
                src={uploadedImage}
                alt="uploaded preview"
                width={24}
                height={24}
              />
              Preview
            </div>
          )}
          {uploadedVideo && (
            <div className="flex items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
              <Image
                src="/video-icon.png"
                alt="video icon"
                width={24}
                height={24}
              />
              Video Uploaded
            </div>
          )}
          <div className="flex items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
            <Image
              src="/happy_emoji.png"
              alt="happy emoji logo"
              width={24}
              height={24}
            />
            Feeling
          </div>
        </div>
      </div>
    </form>
  );
}
