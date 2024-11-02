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
import { RootState } from "../redux/store";
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
  const { user } = useSelector((state: RootState) => state.user);
  const isLiked = user?._id ? Boolean(likes[user._id]) : false;
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.secondary.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4321/posts/${postId}`,
        { userId: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const updatedPost = response.data;
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
          src={'http://localhost:4321/assets/ba.png'}
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
