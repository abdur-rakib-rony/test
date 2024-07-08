"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IStory } from "@/models/Story";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SerializedStory extends Omit<IStory, "_id" | "userId" | "viewers"> {
  _id: string;
  userId: string;
  viewers: string[];
  name: string;
  email: string;
}

interface StoryViewerProps {
  stories: SerializedStory[];
  isOpen: boolean;
  onClose: () => void;
  initialStoryIndex: number;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  isOpen,
  onClose,
  initialStoryIndex,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);

  useEffect(() => {
    setCurrentStoryIndex(initialStoryIndex);
  }, [initialStoryIndex]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        goToNext();
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStoryIndex]);

  const currentStory = stories[currentStoryIndex];

  const goToPrevious = () => {
    setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
  };

  const goToNext = () => {
    setCurrentStoryIndex((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
  };

  if (!currentStory) return null;

  const ReactionsComponent: React.FC<{ reactions: any; userId: string }> = ({
    reactions,
    userId,
  }) => {
    const checkUserInReactions = (reactions: any, userId: string) => {
      for (let reactionType in reactions) {
        if (reactions[reactionType].users.includes(userId)) {
          return reactionType;
        }
      }
      return null;
    };

    const userReaction = checkUserInReactions(reactions, userId);

    return (
      <div className="flex space-x-1">
        {userReaction ? <p>{reactions[userReaction].emoji}</p> : null}
      </div>
    );
  };

  const getUniqueStories = (stories: SerializedStory[]) => {
    const seenUserIds = new Set<string>();
    return stories?.filter((story) => {
      if (seenUserIds.has(story.userId)) {
        return false;
      } else {
        seenUserIds.add(story.userId);
        return true;
      }
    });
  };

  const uniqueStories = getUniqueStories(stories);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full p-0">
        <div className="w-80 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-semibold">All stories</h2>
            <div className="space-y-4">
              {uniqueStories?.map((story) => (
                <div
                  key={story._id}
                  className="flex flex-col items-center space-x-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-[#307777] p-0.5">
                      <Image
                        src="/avatar.png"
                        alt="Profile"
                        width={100}
                        height={100}
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{story?.name}</p>
                      <p className="text-sm text-gray-500">
                        {moment(story?.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <ReactionsComponent
                    reactions={story.reactions}
                    userId={story.userId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative aspect-[9/16] w-full">
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
              alt={currentStory.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2"
          >
            <ChevronRight />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
