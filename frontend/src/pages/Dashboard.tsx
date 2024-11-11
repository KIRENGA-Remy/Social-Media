import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../Widgets/UserWidget";
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from "../Widgets/PostsWidget";
import AdvertWidget from "../Widgets/AdvertWidget";
import FriendListWidget from "../Widgets/FriendListWidget";
import { RootState } from "../redux/store"; 

const Dashboard: React.FC = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state: RootState) => state.user);
  if (!user?._id || !user?.picturePath) {
    return <div>Loading...</div>; 
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user?._id} picturePath={user?.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          sx={{
            height: isNonMobileScreens ? "80vh" : "auto",
            overflowY: "auto", 
          }}
        >
          <MyPostWidget userPicturePath={user?.picturePath} />
          <PostsWidget /> 
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={user?._id} /> 
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
