import { FC } from "react";
import Stories from "./story/Stories";
import { Suspense } from "react";
import PostList from "./post/PostList";
import PostForm from "./post/PostForm";

const MainSection: FC = () => {
  return (
    <main className="scrollbar-hide h-[calc(100vh-4rem)] w-full overflow-y-auto bg-white p-2 md:p-4 lg:min-w-[400px] lg:flex-1">
      <PostForm />
      <Stories />
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default MainSection;
