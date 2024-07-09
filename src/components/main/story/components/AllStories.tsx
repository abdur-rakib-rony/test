"use client";
import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import StoryViewer from "./StoryViewer";
import { viewStory } from "@/app/actions/storyActions";

const AllStories: FC<any> = ({ allstories }) => {
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleReaction = async (storyId: string) => {
    try {
      await viewStory(storyId);
    } catch (error) {
      console.error("Error viewing story:", error);
    }
  };

  const openStoryViewer = (index: number, storyId: string) => {
    setSelectedStoryIndex(index);
    setIsStoryViewerOpen(true);
    handleReaction(storyId);
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -120 : 120;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        carouselRef.current.style.scrollBehavior = "auto";
        carouselRef.current.scrollLeft = 0;
        carouselRef.current.style.scrollBehavior = "smooth";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="relative w-full">
        <div
          ref={carouselRef}
          className="scrollbar-hide flex space-x-4 overflow-x-auto"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="h-56 w-36 flex-shrink-0 snap-start">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-[#307777]">
              <p className="text-center text-sm font-semibold text-white">
                Create Story
              </p>
              <Link href="/create-story">
                <div className="rounded-xl bg-teal-600 p-2">
                  <Plus className="text-white" size={30} />
                </div>
              </Link>
            </div>
          </div>
          {allstories?.map((story: any, index: number) => (
            <div key={story._id} className="h-56 w-40 flex-shrink-0 snap-start">
              <div
                onClick={() => openStoryViewer(index, story._id)}
                className="h-full w-full cursor-pointer"
              >
                {story.type === "text" ? (
                  <div
                    className="flex h-full w-full items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: story.backgroundColor }}
                  >
                    <span className="max-w-[9rem] break-words text-sm font-medium">
                      {story.content}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={story.imageUrl || ""}
                    alt="story"
                    width={192}
                    height={192}
                    className="h-full w-full rounded-lg border object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-lg bg-white bg-opacity-50 p-2"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-l-lg bg-white bg-opacity-50 p-2"
        >
          <ChevronRight />
        </button>
      </div>

      <StoryViewer
        stories={allstories}
        isOpen={isStoryViewerOpen}
        onClose={() => setIsStoryViewerOpen(false)}
        initialStoryIndex={selectedStoryIndex}
      />
    </div>
  );
};

export default AllStories;
