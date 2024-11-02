import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/postSlice";
import PostWidget from "./PostWidget";
import { RootState } from "../redux/store";
import { Post } from "../redux/postSlice"; 
import axios from "axios";

interface PostsWidgetProps {
  userId: string;
  isProfile?: boolean;
}

const PostsWidget: React.FC<PostsWidgetProps> = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);

  const getPosts = async () => {
    try {
    const response = await axios.get(`http://localhost:4321/posts`,
        {withCredentials: true}
    )
    const postData = await response.data;
    dispatch(setPosts({ posts: postData }));
    } catch (error) {
      console.error("Error while fetching posts:", error);
    }
  };

  const getUserPosts = async () => {
    try {
    const response = await axios.get(`http://localhost:4321/posts/${userId}`,
        {withCredentials: true}
    )
    const fetchedUserPosts = await response.data;
    dispatch(setPosts({ posts: fetchedUserPosts }));
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile]);

  return (
    <>
      {posts.map((post: Post) => (
        <PostWidget
          key={post._id}
          postId={post._id}
          postUserId={post.userId}
          name={`${post.firstName} ${post.lastName}`}
          description={post.description}
          location={post.location?.trim() || ""} 
          picturePath={post.picturePath}
          userPicturePath={post.userPicturePath}
          likes={Object.fromEntries(post.likes)} 
          comments={post.comments || []} 
        />
      ))}
    </>
  );
};

export default PostsWidget;
