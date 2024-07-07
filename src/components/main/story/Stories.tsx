import { FC } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { getAllStories } from "@/app/actions/storyActions";
import TextStoryPreview from "./components/TextStoryPreview";

const Stories: FC = async () => {
  let allstories: any = [];
  try {
    allstories = await getAllStories();
  } catch (error) {
    console.error("Failed to fetch stories:", error);
  }

  return (
    <div className="mx-auto max-w-lg">
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            <div className="relative h-48 w-36 overflow-hidden rounded-lg">
              <Image
                src="/chanchal.jpg"
                alt="Add story"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <Link
                href="/create-story"
                className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform flex-col items-center"
              >
                <div className="rounded-xl bg-teal-600 p-2">
                  <Plus className="text-white" size={30} />
                </div>
              </Link>
            </div>
          </CarouselItem>
          {allstories?.map((story: any, index: any) => (
            <CarouselItem key={index} className="basis-1/3">
              {story?.type === "text" ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <button
                      className="flex aspect-[9/16] h-48 w-36 flex-col items-center justify-center overflow-hidden rounded-lg text-white md:w-40"
                      style={{
                        backgroundColor: story?.backgroundColor,
                      }}
                    >
                      <span className="mt-2.5 max-w-36 break-words text-sm text-white">
                        {story?.content}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 w-36 md:w-40">
                  <Image
                    src={story.imageUrl}
                    alt={story.type}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-2 left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center">
                    <div className="relative inline-block">
                      <Image
                        src="/chanchal.jpg"
                        alt="User"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full border"
                      />
                    </div>
                    <p className="mt-1 w-full text-center text-xs text-white">
                      {story.name.length > 15
                        ? `${story.name.slice(0, 15)}...`
                        : story.name}
                    </p>
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform" />
      </Carousel>
    </div>
  );
};

export default Stories;
