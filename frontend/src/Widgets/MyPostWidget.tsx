// import {
//     EditOutlined,
//     DeleteOutlined,
//     AttachFileOutlined,
//     GifBoxOutlined,
//     ImageOutlined,
//     MicOutlined,
//     MoreHorizOutlined,
//   } from "@mui/icons-material";
//   import {
//     Box,
//     Divider,
//     Typography,
//     InputBase,
//     useTheme,
//     Button,
//     IconButton,
//     useMediaQuery,
//   } from "@mui/material";
//   import Dropzone from "react-dropzone";
//   import UserImage from "../components/UserImage";
//   import WidgetWrapper from "../components/WidgetWrapper";
//   import { useState, ChangeEvent } from "react";
//   import { useDispatch, useSelector } from "react-redux";
//   import { setPosts } from "../redux/postSlice";
//   import { RootState } from "../redux/store"; // Ensure the correct path to your store types
//   import axios from "axios";
// import { imageToBase64 } from "../utility/ImageToBase64";
//   interface MyPostWidgetProps {
//     picturePath: string;
//   }
  
//   const MyPostWidget: React.FC<MyPostWidgetProps> = ({ picturePath }) => {
//     const dispatch = useDispatch();
//     // const [isImage, setIsImage] = useState(false);
//     const [image, setImage] = useState<File | null>(null);
//     // const [post, setPost] = useState("");
//     const [description, setDescription] = useState('');
//     // const [picturePath, setPicturePath] = useState<string>('');
//     const [isCreating, setIsCreating] = useState(false);
//     const theme = useTheme();
//     const { user } = useSelector((state: RootState) => state.user); 
//     const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//     const mediumMain = theme.palette.secondary.dark;
//     const medium = theme.palette.secondary.light;

//     const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setDescription(event.target.value);
//     };

//     const handlePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0];
//       if (file) {
//         const base64 = await imageToBase64(file);
//         if(typeof base64 === 'string'){
//           setImage(base64);
//         }else {
//           console.error('Error converting image to base64 string');
//         }
//       } else {
//         console.error('No picture found');
//       }
//     };

//     const handlePostCreation = async () => {
//       if (!user?._id) {
//           console.error('User ID is not available');
//           return;
//       }
//       setIsCreating(true);
//     try {
//         const response = await axios.post(
//             'http://localhost:4321/posts',
//             {
//                 userId: user._id,
//                 description,
//                 image
//             },
//             { withCredentials: true }
//         );

//         if (response.status === 200) {
//             const updatedPosts = response.data.posts; 
//             if(typeof updatedPosts === 'string'){
//               dispatch(setImage({ posts: updatedPosts }))
//             } else {
//               console.error('Error converting image to base64 string');
//             }
//         }
//     } catch (err) {
//         console.error('Error creating post:', err);
//     } finally {
//         setIsCreating(false);
//         setDescription('');
//         setPost('');
//     }
//     }

//     // const handlePost = async () => {
//     //     const formData = new FormData();

//     //     if (user?._id) {
//     //         formData.append("userId", user?._id);
//     //     } else {
//     //         console.error("User ID is null. Post cannot be created.");
//     //         return; 
//     //     }
    
//     //     formData.append("description", post);
    
//     //     if (image) {
//     //         formData.append("picture", image); 
//     //         formData.append("picturePath", image.name); 
//     //     }
//     //     try {
//     //         const response = await axios.post(`http://localhost:4321/posts`,
//     //             formData ,
//     //             {withCredentials: true}
//     //         )
//     //         const posts = await response.data;
//     //         dispatch(setPosts({ posts }));
//     //         setImage(null);
//     //         setPost("");
//     //     } catch (error) {
//     //         console.error("Error while posting:", error);
//     //     }
//     // };
    
//     return (
//       <WidgetWrapper>
//         <div className="flex justify-between gap-3">
//           <UserImage image={picturePath} />
//           <InputBase
//             placeholder="What's on your mind..."
//             name="description"
//             onChange={handleDescriptionChange}
//             value={description}
//             sx={{
//               width: "100%",
//               backgroundColor: theme.palette.secondary.light,
//               borderRadius: "2rem",
//               padding: "4px 0",
//             }}
//           />
//         </div>
//         {isCreating && (
//           <Box
//             border={`1px solid ${medium}`}
//             borderRadius="5px"
//             mt="1rem"
//             p="1rem"
//           >
//           <Dropzone
//               onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
//               accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }} 
//               multiple={false}
//             >
//           {({ getRootProps, getInputProps }) => (
//       <div>
//       <Box
//         {...getRootProps()}
//         border={`2px dashed ${theme.palette.primary.main}`}
//         p="1rem"
//         width="100%"
//         sx={{ "&:hover": { cursor: "pointer" } }}
//       >
//         <input {...getInputProps()} />
//         {!image ? (
//           <p className="cursor-pointer">Add Image Here</p>
//         ) : (
//           <div className="cursor-pointer">
//             <Typography>{image.name}</Typography>
//             <EditOutlined />
//           </div>
//         )}
//       </Box>
//       {image && (
//         <IconButton
//           onClick={() => setImage(null)}
//           sx={{ width: "15%" }}
//         >
//           <DeleteOutlined />
//         </IconButton>
//       )}
//     </div>
//   )}
// </Dropzone>
//           </Box>
//         )}
//         <Divider sx={{ margin: "1.25rem 0" }} />
  
//         <div className="flex justify-between items-center">
//           <div className="flex gap-1 cursor-pointer" onClick={() => setIsCreating(!isCreating)}>
//             <ImageOutlined sx={{ color: mediumMain }} />
//             <Typography
//               color={mediumMain}
//               sx={{ "&:hover": { color: medium } }}
//             >
//               Image
//             </Typography>
//           </div>
  
//           {isNonMobileScreens ? (
//             <>
//               <div className="flex gap-1 cursor-pointer">
//                 <GifBoxOutlined sx={{ color: mediumMain }} />
//                 <Typography color={mediumMain}>Clip</Typography>
//               </div>
  
//               <div className="flex gap-1 cursor-pointer">
//                 <AttachFileOutlined sx={{ color: mediumMain }} />
//                 <Typography color={mediumMain}>Attachment</Typography>
//               </div>
  
//               <div className="flex gap-1 cursor-pointer">
//                 <MicOutlined sx={{ color: mediumMain }} />
//                 <Typography color={mediumMain}>Audio</Typography>
//               </div>
//             </>
//           ) : (
//             <div className="flex gap-1">
//               <MoreHorizOutlined sx={{ color: mediumMain }} />
//             </div>
//           )}
  
//           <Button
//             disabled={isCreating || !description}
//             onClick={handlePostCreation}
//             sx={{
//               color: theme.palette.background.alt,
//               backgroundColor: theme.palette.primary.main,
//               borderRadius: "3rem",
//               cursor: 'pointer'
//             }}
//           >
//             {isCreating ? 'Posting' : 'POST' }
//           </Button>
//         </div>
//       </WidgetWrapper>
//     );
//   };
  
//   export default MyPostWidget;
  








import {
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  CloudUploadOutlined
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
import { useState } from "react";
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

  const mediumMain = theme.palette.secondary.dark;

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    const base64 = await imageToBase64(file);
    if (typeof base64 === "string") {
      setPicturePath(base64); // Store the base64 string
    } else {
      console.error("Error converting image to base64 string");
    }
  };

  const handlePostCreation = async () => {
    if (!user?._id) {
      console.error("User ID is not available");
      return;
    }
    setIsCreating(true);

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
        dispatch(setPosts(response.data.posts));
        setDescription("");
        setPicturePath(null);
      }
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <WidgetWrapper>
      <Box display="flex" justifyContent="space-between" gap="1rem">
        <UserImage image={userPicturePath} />
        <InputBase
          placeholder="What's on your mind..."
          value={description}
          onChange={handleDescriptionChange}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.secondary.light,
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
            color: 'black'
          }}
        />
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
            <Box display="flex" gap="0.5rem" sx={{ cursor: 'pointer' }}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </Box>
            <Box display="flex" gap="0.5rem" sx={{ cursor: 'pointer' }}>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </Box>
            <Box display="flex" gap="0.5rem" sx={{ cursor: 'pointer' }}>
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
