import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types'

import { Box, Button } from '@mui/material';

function GetSheetStep({ steps, startDate, endDate }) {
  const schoolData = JSON.parse(localStorage.getItem('school'));
  const schoolid = schoolData && schoolData.length > 0 ? schoolData[0].id : null;

  const programid = localStorage.getItem("programId");
  const groupid = localStorage.getItem("groupId");
  const startdate = startDate;
  const enddate = endDate;
  const token = localStorage.getItem('token')

  function createCSVFromString(dataString) {
    const blob = new Blob([dataString], { type: 'text/csv' });
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';
  
    link.click();
  }
  const handleGetReportButtonClick = async () => {

    await axios.get(`https://api.runningkiddos.com/api/Students/getStudentLapsCSVForProgram?schoolId=${schoolid}&programId=${programid}&groupId=${groupid}&startDate=${startdate}&endDate=${enddate}&timezone=Europe/Berlin`, {
      headers: {
        Authorization: `${token}`
      }
    }).then(response => {
      alert('Success')
      createCSVFromString(response.data);
    })
      .catch(error => {
        console.error('Error fetching the CSV: ', error);
      });
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {steps[steps.length - 1].buttons.map((button) => (
        <Button
          key={button.label}
          variant="contained"
          onClick={() => handleGetReportButtonClick()}
          sx={{
            mt: 1,
            mr: 1,
            minWidth: '100px',
            backgroundColor: '#B9EC51',
            color: '#333333',
            '&:hover': {
              backgroundColor: '#B9EC51',
            },
          }}
        >
          {button.label}
        </Button>
      ))}
    </Box>
  );
};

GetSheetStep.propTypes = {
  steps: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default GetSheetStep;
