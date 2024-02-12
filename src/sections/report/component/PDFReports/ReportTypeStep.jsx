import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Typography } from '@mui/material';

function ShowText(incomeText) {
  const text = [
    {
      label: 'Distance',
      description: 'Total miles for each student by date range. Creates a list of each student’s total miles for the date range given. Plus, a total for the group selected. This report lists the course used for the laps at the top.'
    },
    {
      label: 'Laps',
      description: 'Total laps and mileage for each student by date range. Creates a list of each student’s total laps & miles, per course, for the date range given. Plus, a total for the group selected.'
    },
    {
      label: 'Time',
      description: 'Total run time (with optional splits) by student. This report displays scan session data by date & time. It shows the device and course related to that scan session. It creates a list of each student’s individual laps, lap time, and overall time. To get splits, check the box titled, “Include Splits?” before clicking, “Get Report.”'
    },
    {
      label: 'Monthly Participation',
      description: 'Number of days a student participated each month for a yearly total. Creates a report, listed by student, showing the number of days they participated during each month, for a yearly total. Also displays the totals by month for the group selected.'
    },
    {
      label: 'Daily Participation',
      description: 'Number of days each student participated during a selected week. Creates a report, listed by student, marking the days they participated during the selected week, with a total number of days participated by student. Also shows the total number of students participating per day and the total number for the group selected.'
    },
    {
      label: 'Group Averages',
      description: 'Daily, weekly, and student averages by group for the date range selected. This report displays the daily average, weekly average, and average miles per student, based on the group selected. It also displays the total miles for the group.'
    },
    {
      label: 'Student Monthly Progress',
      description: 'Number of miles per student for the year. The date range for this report is one calendar year. It displays the number of miles covered by each student per month, with a yearly total. The report also includes an overall monthly and yearly total for the group selected.'
    },
    {
      label: 'Student Daily Progress',
      description: 'Number of miles per student for the selected week. The date range for this report is one week. It displays the number of miles covered by a student, each day, with a total for the week. It also displays the total for each day and the week for the group selected.'
    },
    {
      label: 'Individual Student Report',
      description: 'Total laps and miles for each student selected for the date range. This report allows you to select all students within a group or individual students within the group. A new page is created for each student. The report shows total laps and miles per course, monthly participation, and monthly distance for each student in the selected date range. (Note: These reports may be generated for a 1-year time frame. For example: 08/01/2021-08/01/2022)'
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

function ReportTypeStep({ selectedReport, handleButtonClick, steps }) {

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


ReportTypeStep.propTypes = {
  selectedReport: PropTypes.string,
  handleButtonClick: PropTypes.func,
  steps: PropTypes.array
}


export default ReportTypeStep;
