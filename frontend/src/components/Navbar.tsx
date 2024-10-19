import React, { useState } from 'react'
import {
  Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery
} from '@mui/material'
import {
  Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setMode, setLogout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.secondary.light;
  const dark = theme.palette.secondary.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.paper;

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
        <div className='rounded-md py-1 px-8 flex justify-between gap-16' style={{background: neutralLight}}>
          <InputBase placeholder="Search..." sx={{fontWeight: 'bold', fontSize: '14px', color: ''}}/>
          <IconButton sx={{ color: 'white', fontWeight:'bold'}}>
            <Search />
          </IconButton>
        </div>
      )}
      </div>
      { isNonMobileScreens ? (
        <div className='flex gap-4'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{color: 'white' , fontSize: '25px'}} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px'}} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px'}} />
          <Notifications sx={{ fontSize: '25px'}} />
        </div>
      ) : (
        <div className='flex gap-8 px-16 py-4'>Credentials</div>
      )}
    </div>
  )
}

export default Navbar;
