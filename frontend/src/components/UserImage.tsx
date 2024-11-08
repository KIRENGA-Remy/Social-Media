import { Box } from "@mui/material";
import React from "react"

interface UserImageProps{
    image: string,
    size?: string
}

const UserImage: React.FC<UserImageProps> = ({ image, size='60px'}) => {
    return(
        <Box width={size} height={size}>
            <img 
            style={{ borderRadius: '50%', width:'100%', height:'100%' , objectFit: 'cover', cursor:'pointer'}}
            width={size}
            height={size}
            src={image}
            alt="user" />
        </Box>
    )
}

export default UserImage;