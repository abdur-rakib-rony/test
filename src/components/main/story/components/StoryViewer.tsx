"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import moment from "moment";
import { ChevronLeft, ChevronRight, ThumbsUp, Heart, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { reactToStory } from "@/app/actions/storyActions";
import Emojies from "./Emojies";
import { Badge } from "@/components/ui/badge";

const StoryViewer: React.FC<any> = ({
  stories,
  isOpen,
  onClose,
  initialStoryIndex,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setCurrentStoryIndex(initialStoryIndex);
  }, [initialStoryIndex]);

  useEffect(() => {
    setProgress(100);
  }, [currentStoryIndex]);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            goToNext();
            return 100;
          }
          return prevProgress - 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isOpen, currentStoryIndex]);

  const currentStory = stories[currentStoryIndex];

  const goToPrevious = () => {
    setCurrentStoryIndex((prev: any) =>
      prev > 0 ? prev - 1 : stories.length - 1,
    );
    setProgress(100);
  };

  const goToNext = () => {
    setCurrentStoryIndex((prev: any) =>
      prev < stories.length - 1 ? prev + 1 : 0,
    );
    setProgress(100);
  };

  if (!currentStory) return null;

  const ReactionsComponent: React.FC<{
    reactions: any;
    userId: string;
    storyId: string;
  }> = ({ reactions, userId, storyId }) => {
    const [userReaction, setUserReaction] = useState<string | null>(null);

    useEffect(() => {
      const checkUserInReactions = (reactions: any, userId: string) => {
        for (let reactionType in reactions) {
          if (reactions[reactionType]?.users?.includes?.(userId)) {
            return reactionType;
          }
        }
        return null;
      };

      setUserReaction(checkUserInReactions(reactions, userId));
    }, [reactions, userId]);

    const handleReaction = async (reaction: "like" | "love") => {
      await reactToStory(storyId, reaction);
      setUserReaction((prev) => (prev === reaction ? null : reaction));
    };

    return (
      <div className="absolute bottom-4 left-4 z-10 flex space-x-2">
        <button onClick={() => handleReaction("like")}>
          <ThumbsUp
            className={
              userReaction === "like" ? "text-blue-500" : "text-gray-400"
            }
          />
        </button>
        <button onClick={() => handleReaction("love")}>
          <Heart
            className={
              userReaction === "love" ? "text-red-500" : "text-gray-400"
            }
          />
        </button>
      </div>
    );
  };

  const ProgressBar = ({ progress }: any) => (
    <div className="absolute left-0 top-0 z-20 h-1 w-full bg-[#307777]">
      <div
        className="h-full bg-white transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full p-0">
        <div className="w-80 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold">All stories</h2>
            <Badge><Eye size={15} className="mr-1"/> {currentStory?.viewers?.length || 0}</Badge>
            <div className="scrollbar-hide h-96 space-y-4 overflow-y-auto">
              {stories?.map((story: any) => (
                <ul className="mt-6 space-y-6" key={story._id}>
                  <li className="flex cursor-pointer items-center text-sm">
                    <span className="relative mr-3 inline-block">
                      <Avatar className="border-4 border-[#307777]">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </span>
                    <div className="flex flex-col gap-px">
                      <p>{story?.userId?.firstName}</p>
                      <p className="text-xs">
                        {moment(story?.createdAt).fromNow()}
                      </p>
                      <Emojies story={story} />
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className="relative aspect-[9/16] w-full">
          <ProgressBar progress={progress} />
          {currentStory.type === "text" ? (
            <div
              className="flex h-full w-full items-center justify-center rounded-lg p-4 text-white"
              style={{ backgroundColor: currentStory.backgroundColor }}
            >
              <p className="text-center font-medium">{currentStory.content}</p>
            </div>
          ) : (
            <Image
              src={currentStory.imageUrl || ""}
              alt="story"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
          <ReactionsComponent
            reactions={currentStory.reactions}
            userId={currentStory.userId._id}
            storyId={currentStory._id}
          />
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2"
          >
            <ChevronRight />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
