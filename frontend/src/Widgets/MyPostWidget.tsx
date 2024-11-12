import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/postSlice";
import { RootState } from "../redux/store";
import axios from "axios";
import { imageToBase64 } from "../utility/ImageToBase64";

interface MyPostWidgetProps {
  userPicturePath: string;
}

const MyPostWidget: React.FC<MyPostWidgetProps> = ({ userPicturePath }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [description, setDescription] = useState("");
  const [picturePath, setPicturePath] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const mediumMain = theme.palette.secondary.dark;

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    const base64 = await imageToBase64(file);
    if (typeof base64 === "string") {
      setPicturePath(base64); 
    } else {
      console.error("Error converting image to base64 string", error);
    }
  };

  const handlePostCreation = async () => {
    if (!user?._id) {
      console.error("User ID is not available");
      return;
    }
    setIsCreating(true);
    setError(null); 

    try {
      const response = await axios.post(
        "http://localhost:4321/posts",
        {
          userId: user._id,
          description,
          picturePath,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        await fetchPosts();
        setDescription("");
        setPicturePath(null);
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const fetchPosts = async () => {
    setError(null); 
    try {
      const postsResponse = await axios.get("http://localhost:4321/posts", {
        withCredentials: true,
      });
      dispatch(setPosts({ posts: postsResponse.data.posts }));
    } catch (err) {
      console.error("Error retrieving posts:", err);
      setError("Failed to load posts. Please try again.");
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPosts();
    }
  }, [user]);

  return (
    <WidgetWrapper>
      <Box display="flex" alignItems="center" gap="20px" mt="0.75rem">
        <InputBase
          placeholder="What's on your mind..."
          value={description}
          onChange={handleDescriptionChange}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.secondary.light,
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
            color: "black",
            maxHeight: "fit-content",
          }}
        />
        <UserImage image={userPicturePath} />
      </Box>

      <Dropzone
        onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles[0])}
        accept={{ "image/*": [] }}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            border={`2px dashed ${theme.palette.primary.main}`}
            p="1rem"
            mt="2rem"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            {picturePath ? (
              <>
                <input {...getInputProps()} />
                <Typography color={mediumMain} align="center">
                  Image uploaded
                </Typography>
              </>
            ) : (
              <>
                <input {...getInputProps()} />
                <Typography color={mediumMain} align="center">
                  Drag & drop an image here, or click to upload
                </Typography>
              </>
            )}
          </Box>
        )}
      </Dropzone>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap="0.5rem" sx={{ cursor: "pointer" }}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain}>Image</Typography>
        </Box>

        {isNonMobileScreens ? (
          <>
            <Box display="flex" gap="0.5rem" sx={{ cursor: "pointer" }}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </Box>
            <Box display="flex" gap="0.5rem" sx={{ cursor: "pointer" }}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </Box>
            <Box display="flex" gap="0.5rem" sx={{ cursor: "pointer" }}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </Box>
          </>
        ) : (
          <MoreHorizOutlined sx={{ color: mediumMain }} />
        )}

        <Button
          onClick={handlePostCreation}
          disabled={isCreating || (!description && !picturePath)}
          sx={{
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "3rem",
            padding: "0.5rem 1.5rem",
            ":hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          {isCreating ? "Posting..." : "POST"}
        </Button>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
