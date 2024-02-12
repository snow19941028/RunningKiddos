import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button } from '@mui/material';

function GroupTypeStep({ steps, groupType,handleGroupType }){

  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {steps[1].buttons.map((button) => (
        <Button
          key={button.label}
          variant="contained"
          onClick={() => handleGroupType(button.label)}
          sx={{
            mt: 1,
            mr: 1,
            minWidth: '100px',
            backgroundColor: groupType === button.label ? '#97B9FF' : '#F6F7F9',
            color: '#333333',
            '&:hover': {
              backgroundColor: '#97B9FF',
            },
          }}
        >
          {button.label}
        </Button>
      ))}
    </Box>
  </Box>
  );
};

GroupTypeStep.propTypes ={
  steps: PropTypes.array,
  groupType: PropTypes.string,
  handleGroupType: PropTypes.func
}


export default GroupTypeStep;
