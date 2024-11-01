import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../redux/userSlice";
import { RootState } from "../redux/store"; 
import axios from "axios";

interface FriendListWidgetProps {
  userId: string;
}

const FriendListWidget: React.FC<FriendListWidgetProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { user } = useSelector((state: RootState) => state.user);
  const friends = user ? user?.friends : []; 

  const getFriends = async () => {
    try{
    const response = await axios.get(`http://localhost:4321/users/${userId}/friends`,
        { withCredentials: true}
    )
    const fetchedFriends = await response.data;
    dispatch(setFriends({ friends: fetchedFriends }));
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); 

  return (
    <WidgetWrapper>
      <Typography
        color={palette.secondary.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend: any) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
