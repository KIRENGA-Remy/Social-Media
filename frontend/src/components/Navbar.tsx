import React, { useState } from 'react';
import {
  Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery
} from '@mui/material';
import {
  Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setMode, setLogout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  console.log('here is user', user);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.secondary.light;
  const dark = theme.palette.secondary.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;

  return (
    <div className="flex justify-between">
      <div className="flex gap-8 px-16 py-4">
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: "clamp(1rem, 2rem, 2.25rem)",
            color: 'rgba(0, 213, 250, 1)',
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer'
            }
          }}
          onClick={() => navigate('/home')}
        >
          Xpedia
        </Typography>
        {isNonMobileScreens && (
          <div className='rounded-md py-1 px-8 flex justify-between gap-16' style={{ background: neutralLight }}>
            <InputBase placeholder="Search..." sx={{ fontWeight: 'bold', fontSize: '14px' }} />
            <IconButton sx={{ color: 'white', fontWeight: 'bold' }}>
              <Search />
            </IconButton>
          </div>
        )}
      </div>
      {isNonMobileScreens ? (
        <div className='flex gap-8 px-16 py-4 justify-center items-center'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ color: 'white', fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px', cursor: 'pointer' }} />
          <Notifications sx={{ fontSize: '25px', cursor: 'pointer' }} />
          <Help sx={{ fontSize: '25px', cursor: 'pointer' }} />
          <FormControl variant='standard'>
            <Select
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem>
                <Typography>Remy</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          sx={{ margin: '12px', zIndex: '5' }}
        >
          {isMobileMenuToggled ? <Close /> : <Menu />}
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <div className="fixed right-0 bottom-4 h-full z-10 max-w-[500px] min-w-[200px]" style={{ backgroundColor: background }}>
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              sx={{ position: 'fixed', right: '0px', margin: '12px', zIndex: '10' }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='flex flex-row gap-8 items-center'>
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px", cursor: 'pointer' }} />
            </div>
            <div className='flex flex-row gap-8 items-center'>
              <Notifications sx={{ fontSize: "25px", cursor: 'pointer' }} />
              <Help sx={{ fontSize: "25px", cursor: 'pointer' }} />
            </div>
            <FormControl variant="standard">
              <Select
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem>
                  <Typography>Remy</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
