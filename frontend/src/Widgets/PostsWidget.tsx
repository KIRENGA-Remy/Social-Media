import { useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import { RootState } from "../redux/store";
import { Post } from "../redux/postSlice"; 
import { Typography } from "@mui/material";

const PostsWidget: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  
  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <>
      {safePosts.length === 0 ? (
        <Typography sx={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'8px'}}>No posts available</Typography>
      ) : (
        safePosts.map((post: Post) => (
          <PostWidget
            key={post._id}
            postId={post._id}
            postUserId={post.userId}
            name={`${post.firstName} ${post.lastName}`}
            description={post.description}
            location={post.location?.trim() || ""} 
            picturePath={post.picturePath}
            userPicturePath={post.userPicturePath}
            likes={post.likes || []}
            comments={post.comments || []} 
          />
        ))
      )}
    </>
  );
};

export default PostsWidget;
