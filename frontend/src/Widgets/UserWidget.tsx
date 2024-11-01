import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import UserImage from "../components/UserImage";
  import WidgetWrapper from "../components/WidgetWrapper";
//   import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
//   import { RootState } from "../redux/store"; // Assuming your root state is in "state"
  import twitter from '../assets/twitter.png'
  import linkedin from '../assets/linkedin.png'
import axios from "axios";

  interface UserWidgetProps{
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

//   const theme = useTheme();
  const UserWidget: React.FC<UserWidgetProps> = ({ userId, picturePath }) => {
    const [user, setUser] = useState<User | null>(null); 
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.secondary.dark;
    const medium = palette.secondary.light;
    const main = palette.secondary.main;

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:4321/users/${userId}`,
                { withCredentials: true}
            )
            const fetchedData = await response.data as User;
            setUser(fetchedData)
        } catch (err) {
            console.error('Error while fetching user data', err)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    if(!user){
        return null;
    }

    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

  return (
    <WidgetWrapper theme={useTheme()}>
    {/* <> */}
      {/* FIRST ROW */}
      <div className="flex justify-between gap-2 pb-[1.1rem]"
        onClick={() => navigate(`/profile/${userId}`)}>
        <div className="gap-4">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </div>
        <ManageAccountsOutlined />
      </div>

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
        <div className="mb-2">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </div>
        <div>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </div>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <div className="flex justify-between gap-4 mb-[0.5rem]">
          <div className="flex justify-between gap-4">
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </div>
          <EditOutlined sx={{ color: main }} />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex justify-between gap-4">
            <img src={linkedin} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </div>
          <EditOutlined sx={{ color: main }} />
        </div>
      </Box>
      {/* </> */}
    </WidgetWrapper>
  );
};

export default UserWidget;
