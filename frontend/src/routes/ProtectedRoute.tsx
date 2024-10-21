import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { stepLabelClasses } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLogin } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}:{children:ReactNode}) {
   //authenticate
   const dispatch=useDispatch<AppDispatch>()
   const navigate=useNavigate()
   const {loading}=useSelector((state:RootState)=>state.user)
   useEffect(()=>{
    const authenticate=async()=>{
        const response = await fetch('http://localhost:4321/auth', {
            method: 'GET',
          headers:{
            credentials: "same-origin"
          }
          });
          if(response.ok){
            const fetchedData=await response.json()
            dispatch(setLogin(fetchedData.user))
            navigate('/home');
          }
          else{
            navigate("/")
          }
        }
    authenticate()
   },[dispatch])
   if(loading){
    return(
        <div>
            Loading.....
        </div>
    )
   }
   return (
    <div>
        {children}
      
    </div>
  )
}

export default ProtectedRoute
