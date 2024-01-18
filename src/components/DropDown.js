import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import '../css/InputBox.css';

const CustomSelect = styled(Select)({
  '&.CustomDropdown-root': { borderRadius: '20px' }
});

const DropDown = ({ updateFunction, value, label, options }) => {
  const handleChange = (event) => {
    updateFunction && updateFunction(event.target.value);
  };

  return (
    <FormControl>
     
      <CustomSelect
        className="CustomDropdown-root"
        labelId={`${label.toLowerCase()}-label`}
        id={`${label.toLowerCase()}-select`}
        value={value || options[0]?.value}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default DropDown;
