// CustomButton.js
import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ onClick, variant ,  type , className, style ,color,label}) => {
  return ( 
    <Button
      variant={variant}
      
      type={type}
      onClick={onClick}
      className={className}
      style={style}
      color={color}
      
    >
     {label}
    </Button>
  );
}

export default CustomButton;
