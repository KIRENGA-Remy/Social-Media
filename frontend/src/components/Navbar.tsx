import React, { useState } from 'react'
import {
  Box,IconButton,InputBase,Typography,Select,MenuItem,FormControl,useTheme,useMediaQuery
} from '@mui/material'
import{ 
  Search,Message,DarkMode,LightMode,Notifications,Help,Menu,Close
} from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { setMode, setLogout } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const [ isMobileMenuToggled, setIsMobileMenuToggled] = useState()
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
    <div className='flex flex-row justify-between bg-gray-800 h-max px-8 py-8'>
      <div className='font-bold text-3xl text-white'>Xpedia</div>
      <div className='text-white'>Navigations</div>
      <div className='text-white'>Credentials</div>
    </div>
  )
}

export default Navbar;
