import React from 'react';
import  PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

function GroupSelectionStep({ classData, handleGroupTitleChange }){
  return (
  <Select
            onChange={(e) => handleGroupTitleChange(e.target.value)}
            sx={{
                height: '40px',
                width: '250px',
                marginRight: '50px',
                '& .MuiInputBase-root': {
                    height: '40px',
                    width: '250px',
                    background: '#FFFFFF'
                },
            }}
        >
            {classData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
  );
  
};

GroupSelectionStep.propTypes = {
  classData: PropTypes.array,
  handleGroupTitleChange: PropTypes.func
}
export default GroupSelectionStep;
