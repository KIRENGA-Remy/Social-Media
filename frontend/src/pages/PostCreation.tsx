import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { imageToBase64 } from '../utility/ImageToBase64';
import { useNavigate } from 'react-router-dom';
import { setPosts } from '../redux/postSlice';

const PostCreation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.user);

  const [description, setDescription] = useState('');
  const [picturePath, setPicturePath] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await imageToBase64(file);
      if(typeof base64 === 'string'){
        setPicturePath(base64);
      }else {
        console.error('Error converting image to base64 string');
      }
    } else {
      console.error('No picture found');
    }
  };

  const handlePostCreation = async () => {
    if (!user?._id) {
        console.error('User ID is not available');
        return;
    }

    setIsCreating(true);
    try {
        const response = await axios.post(
            'http://localhost:4321/posts',
            {
                userId: user._id,
                description,
                picturePath,
            },
            { withCredentials: true }
        );

        if (response.status === 200) {
            const updatedPosts = response.data.posts;  
            dispatch(setPosts({ posts: updatedPosts }));
            navigate('/home');
        }
    } catch (err) {
        console.error('Error creating post:', err);
    } finally {
        setIsCreating(false);
        setDescription('');
        setPicturePath('');
    }
};


  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: '0 auto', display:'flex', flexDirection:'column' , gap:'2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a Post
      </Typography>
      
      <TextField
        fullWidth
        label="Description"
        value={description}
        name='description'
        onChange={handleDescriptionChange}
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        type="file"
        name='picturePath'
        onChange={handlePictureChange}
        sx={{ marginBottom: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={handlePostCreation}
        disabled={isCreating || !description}
      >
        {isCreating ? 'Creating Post...' : 'Create Post'}
      </Button>
      <Button
      sx={{ background: "green", color: "white", fontSize:"xl"}} onClick={()=> navigate('/home')}>Skip</Button>
    </Box>
  );
};

export default PostCreation;
