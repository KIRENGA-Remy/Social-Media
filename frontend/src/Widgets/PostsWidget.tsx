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
//   const token = useSelector((state: RootState) => state.token);

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
      {posts.map((post: Post) => {
        const {
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        } = post;

        const likesRecord: Record<string, boolean> = Object.fromEntries(likes);

        return (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likesRecord}
            comments={comments}
          />
        );
      })}
    </>
  );
};

export default PostsWidget;
