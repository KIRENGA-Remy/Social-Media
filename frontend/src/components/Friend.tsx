import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../redux/userSlice";
import UserImage from "./UserImage";
import { RootState } from "../redux/store";
import axios from "axios";
import { useEffect, useState } from "react";

interface FriendProps {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
  userId: string;
}

const Friend: React.FC<FriendProps> = ({ friendId, name, subtitle, userPicturePath, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [isFriend, setIsFriend] = useState(user?.friends.includes(friendId));

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.secondary.light;
  const medium = palette.secondary.dark;

  // Update isFriend whenever the user or friends list changes
  useEffect(() => {
    setIsFriend(user?.friends.includes(friendId));
  }, [user, user?.friends]);

  const toggleFriend = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4321/users/${userId}/friends/${friendId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const updatedFriends = response.data;
      dispatch(setFriends({ friends: updatedFriends }));
    } catch (err) {
      console.error("Error while adding or removing friend", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-2">
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
        <UserImage image={userPicturePath} size="55px" />
      </div>

      {/* Only show the IconButton if the friendId is different from the logged-in userId */}
      {friendId !== userId && (
        <IconButton
          onClick={toggleFriend}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default Friend;
