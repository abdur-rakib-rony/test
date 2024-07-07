import { FC } from "react";
import { getAllStories } from "@/app/actions/storyActions";
import AllStories from "./components/AllStories";
import { IStory } from "@/models/Story";

interface SerializedStory extends Omit<IStory, "_id" | "userId" | "viewers"> {
  _id: string;
  userId: string;
  viewers: string[];
  name: string;
  email: string;
}

const Stories: FC = async () => {
  let allstories: SerializedStory[] = [];
  try {
    const fetchedStories = await getAllStories();
    allstories = JSON.parse(JSON.stringify(fetchedStories));
  } catch (error) {
    console.error("Failed to fetch stories:", error);
  }

  return <AllStories allstories={allstories} />;
};

export default Stories;
