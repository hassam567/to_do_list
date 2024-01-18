
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";

const Input = ({ placeholder, updateTitle, taskTitle,  }) => {


  const handleTitleChange = (event) => {

    updateTitle(event.target.value);
  };


  return (
    <>
      
      <TextField

        className="CustomTextField-root"
        variant="outlined"
        placeholder={placeholder}
        value={taskTitle}
        onChange={handleTitleChange}
        multiline
      // rows={2}



      />
    </>


  );
}

export default Input;

// name
// value
// placeholder
// type
// onchange