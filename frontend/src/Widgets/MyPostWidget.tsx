import {
    EditOutlined,
    DeleteOutlined,
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
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import Dropzone from "react-dropzone";
  import UserImage from "../components/UserImage";
  import WidgetWrapper from "../components/WidgetWrapper";
  import { useState, ChangeEvent } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "../redux/postSlice";
  import { RootState } from "../redux/store"; // Ensure the correct path to your store types
import axios from "axios";
  
  interface MyPostWidgetProps {
    picturePath: string;
  }
  
  const MyPostWidget: React.FC<MyPostWidgetProps> = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [post, setPost] = useState("");
    const theme = useTheme();
    const { user } = useSelector((state: RootState) => state.user); 
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = theme.palette.secondary.dark;
    const medium = theme.palette.secondary.light;

    const handlePost = async () => {
        const formData = new FormData();

        if (user?._id) {
            formData.append("userId", user?._id);
        } else {
            console.error("User ID is null. Post cannot be created.");
            return; 
        }
    
        formData.append("description", post);
    
        if (image) {
            formData.append("picture", image); 
            formData.append("picturePath", image.name); 
        }
        try {
            const response = await axios.post(`http://localhost:4321/posts`,
                formData ,
                {withCredentials: true}
            )
            const posts = await response.data;
            dispatch(setPosts({ posts }));
            setImage(null);
            setPost("");
        } catch (error) {
            console.error("Error while posting:", error);
        }
    };
    
    return (
      <WidgetWrapper>
        <div className="flex justify-between gap-3">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPost(e.target.value)
            }
            value={post}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </div>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
          <Dropzone
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }} 
              multiple={false}
            >
          {({ getRootProps, getInputProps }) => (
      <div>
      <Box
        {...getRootProps()}
        border={`2px dashed ${theme.palette.primary.main}`}
        p="1rem"
        width="100%"
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <input {...getInputProps()} />
        {!image ? (
          <p className="cursor-pointer">Add Image Here</p>
        ) : (
          <div className="cursor-pointer">
            <Typography>{image.name}</Typography>
            <EditOutlined />
          </div>
        )}
      </Box>
      {image && (
        <IconButton
          onClick={() => setImage(null)}
          sx={{ width: "15%" }}
        >
          <DeleteOutlined />
        </IconButton>
      )}
    </div>
  )}
</Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <div>
          <div className="flex justify-between gap-1" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </div>
  
          {isNonMobileScreens ? (
            <>
              <div className="flex justify-between gap-1">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </div>
  
              <div className="flex justify-between gap-1">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </div>
  
              <div className="flex justify-between gap-1">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </div>
            </>
          ) : (
            <div className="flex justify-between gap-1">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </div>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: theme.palette.background.alt,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </div>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;
  