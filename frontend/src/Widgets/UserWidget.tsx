import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import twitter from '../assets/twitter.png';
import linkedin from '../assets/linkedin.png';
import axios from "axios";

interface UserWidgetProps {
  userId: string;
  picturePath: string;
}

interface User {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  friends: string[];
}

const UserWidget: React.FC<UserWidgetProps> = ({ userId, picturePath }) => {
  const [user, setUser] = useState<User | null>(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.secondary.dark;
  const medium = palette.secondary.light;
  const main = palette.secondary.main;

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4321/users/${userId}`, {
        withCredentials: true,
      });
      const fetchedData = response.data as User;
      setUser(fetchedData);
    } catch (err) {
      console.error("Error while fetching user data", err);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <Box display="flex" justifyContent="space-between" alignItems="center" pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}>
        <Box display="flex" gap="1rem" alignItems="center">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: palette.primary.light,
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </Box>
        <ManageAccountsOutlined />
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Box mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </Box>
        <Box>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb="0.5rem">
          <Box display="flex" alignItems="center" gap="1rem">
            <img src={twitter} alt="Twitter logo" width="24" height="24" />
            <Box>
              <Typography color={main} fontWeight="500">Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: main }} />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="1rem">
            <img src={linkedin} alt="LinkedIn logo" width="24" height="24" />
            <Box>
              <Typography color={main} fontWeight="500">LinkedIn</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: main }} />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
