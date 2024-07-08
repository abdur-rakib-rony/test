import { FC } from "react";
import { getAllPosts } from "@/app/actions/post";
import Post from "./Post";

const PostList: FC = async () => {
  try {
    const posts = await getAllPosts();

    return (
      <div>
        {posts.map((post: any) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  } catch (error) {
    return <div>Error loading posts</div>;
  }
};

export default PostList;
