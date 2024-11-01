import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import Friend from "../components/Friend";
  import WidgetWrapper from "../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../redux/postSlice";
  import { RootState } from "../redux/store"; // Assuming you have defined your RootState
import axios from "axios";
  
  interface PostWidgetProps {
    postId: string;
    postUserId: string;
    name: string;
    description: string;
    location: string;
    picturePath?: string;
    userPicturePath: string;
    likes: Record<string, boolean>;
    comments: string[];
  }

//   interface Post {
//     userId: string,
//     firstName: string, 
//     lastName: string
//     location: string,
//     description: string,
//     picturePath: string,
//     userPicturePath: string,
//     likes: Map<string, boolean>
//     comments: string[]
//   }
  
  const PostWidget: React.FC<PostWidgetProps> = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    // const token = useSelector((state: RootState) => state.token);
    // const loggedInUserId = useSelector((state: RootState) => state.user._id);
    const { user } = useSelector((state: RootState) => state.user);
    const isLiked = user?._id ? Boolean(likes[user?._id]) : false;
    
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.secondary.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      try {
        const response = await axios.patch(`http://localhost:4321/posts/${postId}`,
            {userId: user?._id} ,
            {
            headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true
            }
        )
        const updatedPost = await response.data;
        dispatch(setPost({ post: updatedPost }));
      } catch (error) {
        console.error("Error updating like:", error);
      }
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:4321/assets/${picturePath}`}
          />
        )}
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex justify-between gap-2">
            <div className="flex justify-between gap-1">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </div>
  
            <div className="flex justify-between gap-1">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </div>
          </div>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </div>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
  