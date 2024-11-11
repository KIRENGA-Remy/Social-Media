import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../redux/userSlice";
import UserImage from "./UserImage";
import { RootState } from "../redux/store";
import axios from "axios";

interface FriendProps {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

const Friend: React.FC<FriendProps> = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { user } = useSelector((state: RootState) => state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.secondary.light;
  const medium = palette.secondary.dark;

  const isFriend = user?.friends.find((friend: any) => friend._id === friendId);

  const patchFriend = async () => {

    try {
        const response = await axios.patch(`http://localhost:3001/users/:${user?._id}/friends/${friendId}`,{
            headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true
            }
        )
        const fetchedData = await response.data;
        dispatch(setFriends({ friends: fetchedData }));
    } catch (err) {
        console.error('Error while adding or removing friend', err)
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-2">
        <UserImage image={userPicturePath} size="55px" />
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
      </div>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </div>
  );
};

export default Friend;
