import React from 'react';
import { Box, Typography } from '@mui/material';
import MyImage from '../images/check-list.png';
import '../css/InputBox.css';

const Header = ({backgroundColor, padding, fontFamily}) => {
  return (
  
    <Box
      sx={{
        background: backgroundColor,
        padding,
        fontFamily,
        minWidth:"500px", 
      }}
    >
      <Box className="d-flex flex-row align-items-center">
        <img src={MyImage} alt="Icon not found" className='fist_image' />
        <Box className='d-flex flex-column ml-2 third_div'>
          <Typography variant="h3" sx={{ marginBottom: 0 }}>
            TODO LIST
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 0 }}>
            Create your List
          </Typography>
        </Box>
      </Box>
    </Box>
 
  );
}

export default Header;
