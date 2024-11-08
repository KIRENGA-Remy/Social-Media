import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
interface UserWidgetProps {
  userId: string;
  picturePath: string;
}

const UserWidget: React.FC<UserWidgetProps> = ({ userId, picturePath }) => {
  const { user } = useSelector((state: RootState) => state.user);
  
  const theme = useTheme();
  const navigate = useNavigate();
  const dark = theme.palette.secondary.dark;
  const medium = theme.palette.secondary.light;
  const main = theme.palette.secondary.main;

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <Box display="flex" justifyContent="space-between" alignItems="center" pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}>
        <Box display="flex" flexDirection={"column"} gap="1rem" alignItems="center">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="300"
              sx={{
                "&:hover": {
                  color: theme.palette.primary.light,
                },
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography color={medium} fontSize={'1rem'}>{user?.friends?.length ?? 0} friends</Typography>
          </Box>
        </Box>
        <ManageAccountsOutlined />
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium} fontSize={'1rem'}>I am located at {user?.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium} fontSize={'1rem'}>I am a {user?.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Box display={'flex'} justifyContent={'space-between'} mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {user?.viewedProfile}
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'} mb="0.5rem">
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {user?.impressions}
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
            <XIcon fontSize="large" sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500" fontSize={"1rem"}>Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: main, cursor: 'pointer'}} />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="1rem">
          <LinkedInIcon fontSize="large" sx={{ color: main }} />
            <Box>
              <Typography color={main} fontWeight="500" fontSize={"1rem"}>LinkedIn</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </Box>
          <EditOutlined sx={{ color: main, cursor: 'pointer' }} />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
