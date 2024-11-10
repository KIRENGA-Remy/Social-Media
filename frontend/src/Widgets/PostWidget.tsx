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
import { useDispatch } from "react-redux";
import { setPost } from "../redux/postSlice";
import axios from "axios";

interface PostWidgetProps {
  postId: string;
  postUserId: string;
  name: string;
  description: string;
  location: string;
  picturePath?: string | null;
  userPicturePath: string;
  likes: string[];
  comments: string[];
}

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
  const isLiked = likes.includes(postUserId); 
  const likeCount = likes.length; 

  const { palette } = useTheme();
  const main = palette.secondary.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4321/posts/${postId}`,
        { userId: postUserId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const updatedPost = response.data;
      dispatch(setPost({ post: updatedPost }));
    } catch (err) {
      console.error("Error updating like:", err);
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
          src={picturePath}
        />
      )}
      <Box display="flex" justifyContent="space-between" mt="1rem">
        <Box display="flex" gap="0.5rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>

          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{comments.length}</Typography>
        </Box>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Box>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${postId}-comment-${i}`}>
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
