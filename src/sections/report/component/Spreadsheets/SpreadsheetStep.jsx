import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Typography } from '@mui/material';

function ShowText(incomeText) {
  const text = [
    {
      label: 'Laps',
      description: 'A list of each individual lap. This spreadsheet lists each individual lap entry, for every student in the group selected. Each entry includes the student’s name, class, course the lap is associated with, device used to record the lap, date and timestamp of the lap, session start time, and time to complete the lap for the selected date range.'
    },
    {
      label: 'Laps Totals',
      description: 'A list of the total number of laps & distance for each student. This spreadsheet lists each student and their class, with their total number of laps and distance, by course, for the selected date range. There is also a combined total for each student in the selected group.'
    },
  ];

  return (
    <>
      {text.map((row) => (
        row.label === incomeText?(
        <div>
          <Typography sx={{ fontSize: '27pt', mt: 2 }}>
           {row.label}
          </Typography>
          <Typography sx={{ fontSize: '12px', mt: 2 }}>
            {row.description}
          </Typography>
        </div>):null
      ))}
    </>
  );
}

function SpreadsheetStep({ selectedReport, handleButtonClick, steps }) {

  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {steps[0].buttons.map((button) => (
          <Button
            key={button.label}
            variant="contained"
            onClick={() => handleButtonClick(button.label)}
            sx={{
              mt: 1,
              mr: 1,
              minWidth: '100px',
              backgroundColor: selectedReport === button.label ? '#97B9FF' : '#F6F7F9',
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
      {ShowText(selectedReport)}
    </Box>
  );
};


SpreadsheetStep.propTypes = {
  selectedReport: PropTypes.string,
  handleButtonClick: PropTypes.func,
  steps: PropTypes.array
}


export default SpreadsheetStep;
