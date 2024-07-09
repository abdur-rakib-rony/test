import { FC } from "react";
import { getAllPosts } from "@/app/actions/post";
import Post from "./Post";
import { getCurrentUser } from "@/lib/auth";

const PostList: FC = async () => {
  const currentUser = await getCurrentUser();

  try {
    const posts = await getAllPosts();

    return (
      <div>
        {posts.map((post: any) => (
          <Post key={post._id} post={post} currentUser={currentUser} />
        ))}
      </div>
    );
  } catch (error) {
    return <div>Error loading posts</div>;
  }
};

export default PostList;
