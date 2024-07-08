"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createPost } from "@/app/actions/post";
import Image from "next/image";

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'image') {
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
      {errors.content && <span>{errors.content.message}</span>}
      <div className="mb-4 bg-white">
        <div className="flex items-center gap-4 border-b-2 border-gray-100 p-4">
          <div className="relative inline-block">
            <Image
              src="/avatar2.png"
              alt="User"
              width={50}
              height={50}
              className="h-14 w-14 rounded-full border"
            />
          </div>

          <input
            {...register("content")}
            placeholder="What&apos;s on your mind, Shanto?"
            className="flex-grow rounded-full bg-gray-100 py-3 pl-4 text-sm outline-none placeholder:text-[#B0B3B8]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full border-none bg-[#307777] p-2 text-sm text-white"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
        <div className="flex items-center justify-around p-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
            <Image src="/photos.png" alt="photos logo" width={24} height={24} />
            Live Video
            <input 
              type="file" 
              accept="video/*" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, 'video')}
            />
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#9FA2A6]">
            <Image src="/camera.png" alt="camera logo" width={24} height={24} />
            Photo/Video
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'image')}
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
              Image Preview
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
            Feeling/activity
          </div>
        </div>
      </div>
    </form>
  );
}