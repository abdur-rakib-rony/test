import { FC } from "react";
import CreatePost from "./post/CreatePost";
import Stories from "./story/Stories";
import Post from "./post/Post";

const MainSection: FC = () => {
  return (
    <main className="flex-grow p-4">
      <CreatePost />
      <Stories />
      <Post />
    </main>
  );
};

export default MainSection;
