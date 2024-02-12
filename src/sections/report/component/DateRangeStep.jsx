import PropTypes from 'prop-types';
import React, { useState} from 'react';

import { Box, Button } from '@mui/material';

function DateRangeStep({ steps,startDate, endDate, onStartDateChange, onEndDateChange}) {
  const [buttonText, setButtonText] = useState('');

  function handleDateSet(buttonLabel){
    setButtonText(buttonLabel);
    if(buttonLabel === 'Today'){handleTodayClick()}
    if(buttonLabel === 'This Week'){handleThisWeekClick()}
    if(buttonLabel === 'This Month'){handleThisMonthClick()}
  }

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    onStartDateChange({ target: { value: today } });
    onEndDateChange({ target: { value: today } });
  };

  const handleThisWeekClick = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
    onStartDateChange({ target: { value: firstDayOfWeek.toISOString().split('T')[0] } });
    onEndDateChange({ target: { value: lastDayOfWeek.toISOString().split('T')[0] } });
  };

  const handleThisMonthClick = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    onStartDateChange({ target: { value: firstDayOfMonth.toISOString().split('T')[0] } });
    onEndDateChange({ target: { value: lastDayOfMonth.toISOString().split('T')[0] } });
  };


  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', height: '40px' }}>
        {steps[3].buttons.map((button) => (
          <Button
            key={button.label}
            variant="contained"
            onClick={() => handleDateSet(button.label)}
            sx={{
              mt: 1,
              mr: 1,
              minWidth: '100px',
              backgroundColor: buttonText === button.label ? '#97B9FF' : '#F6F7F9',
              color: '#333333',
              '&:hover': {
                backgroundColor: '#97B9FF',
              },
            }}
          >
            {button.label}
          </Button>
        ))}
       <input 
        type="date" 
        id="start-date" 
        value={startDate} 
        onChange={onStartDateChange} 
        style={{marginTop: '10px', marginLeft: '10px'}}
      />
      <input 
        type="date" 
        id="end-date" 
        value={endDate} 
        onChange={onEndDateChange} 
        style={{marginTop: '10px', marginLeft: '10px'}}
      />
     
      </Box>
    </Box>
  );
};

DateRangeStep.propTypes = {
  steps: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func
}

export default DateRangeStep;
