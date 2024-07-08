import { FC } from "react";
import { getAllStories } from "@/app/actions/storyActions";
import AllStories from "./components/AllStories";

const Stories: FC = async () => {
  try {
    const allstories = await getAllStories();

    return <AllStories allstories={allstories} />;
  } catch (error) {
    return <div>Error loading posts</div>;
  }
};

export default Stories;
