import { FC } from "react";
import Stories from "./story/Stories";
import { Suspense } from 'react'
import PostList from "./post/PostList";
import PostForm from "./post/PostForm";

const MainSection: FC = () => {
  return (
    <main className="flex-grow p-4">
      <PostForm />
      <Stories />
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>
    </main>
  );
};

export default MainSection;
