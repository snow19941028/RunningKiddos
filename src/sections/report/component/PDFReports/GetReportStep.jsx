import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react';

import { Box, Button } from '@mui/material';

import { getCourse, getStudentDistanceTotals } from 'src/apis/api.report';

function GetReportStep({ steps, groupType, startDate, endDate }) {
  const [courseData, setCourseData] = useState([]);
  const todayISOString = new Date().toISOString().split('T')[0];
  console.log("todayISOString");
  console.log(todayISOString);
  const schoolData = JSON.parse(localStorage.getItem('school'));
  const schoolid = schoolData && schoolData.length > 0 ? schoolData[0].id : null;
  const programid = localStorage.getItem("programId");
  const groupid = localStorage.getItem("groupId");
  const startdate = startDate === '' ? todayISOString : startDate;
  const enddate = endDate === '' ? todayISOString : endDate;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        getCourse(`Schools/${schoolid}/courses`)
          .then(res => {

            setCourseData(res.data);
          })
          .catch(err => {
            console.log(err)
          });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [schoolid]);


  function handleGetReportButtonClick() {
    console.log(courseData);
    const data = {
      schoolId: schoolid,
      programId: programid,
      groupId: groupid,
      groupType: `classType`,
      startDate: startdate,
      endDate: enddate
    }
    getStudentDistanceTotals(`Students/getStudentDistanceTotals`, data)
      .then(res => {

        alert('Success!');

      }).catch(err => {
        console.log(err)
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

GetReportStep.propTypes = {
  steps: PropTypes.array,
  groupType: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
}

export default GetReportStep;
