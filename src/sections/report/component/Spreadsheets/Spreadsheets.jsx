
import React, { useState, useEffect } from 'react';

import { Box, Step, Paper, Button, Stepper, StepLabel, Typography, StepContent } from '@mui/material';

import { getClassSectionPart } from 'src/apis/api.report';

import GetSheetStep from './GetSheetStep';
import GroupTypeStep from '../GroupTypeStep';
import DateRangeStep from '../DateRangeStep';
import SpreadsheetStep from './SpreadsheetStep';
import GroupSelectionStep from '../GroupSelectionStep';

const Spreadsheets = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);


  const steps= [
    {
      label: 'Select Spreadsheet Type ',
      buttons: [
        { label: 'Laps' },
        { label: 'Laps Totals' },
      ],
    },
    {
      label: 'Select Group Type',
      buttons: [
        { label: 'School' },
        { label: 'Class' },
        { label: 'Grade' },
      ],
    },
    {
      label: 'Select Group',
      buttons: [],
    },
    {
      label: 'Select Data Range',
      buttons: [
        { label: 'Today', },
        { label: 'This Week' },
        { label: 'This Month' },
      ],
    },
    {
      // label: 'Get Report',
      buttons: [
        { label: 'Get Spreadsheet' },]
    }
  ];

  const [classData, setClassData] = useState([]);
  const schoolData = JSON.parse(localStorage.getItem('school'));
  const schoolId = schoolData && schoolData.length > 0 ? schoolData[0].id : null;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log("response :")

        getClassSectionPart(`Schools/${schoolId}/groups`,
          { filter: '{"where":{"isClassroom": true}}' }
        )
          .then(res => {

            setClassData(res.data);


          }).catch(err => {
            console.log(err)
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [schoolId]); 


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedReport(null);
  };

  const handleButtonClick = (reportLabel) => {
    setSelectedReport(reportLabel);

    if (reportLabel === 'Get Report') {
      alert("here!!")
      const data = {
        schoolId:1111,
        programId:2222,
        groupId:3333,
        groupType: `classType`,
        startDate: `Date()`,
        endDate: `Date()`
      }
      getClassSectionPart(`https://api.runningkiddos.com/api/Students/getStudentDistanceTotals`, data)
        .then(res => {

          alert('success!!');
          // setSelProgramIndex(1)


        }).catch(err => {
          alert('err~~')
          console.log(err)
        });
    } 
  };

  const handleContinue = () => {
    handleNext();
  };

  const handleGroupTitleChange = (value) => {
    localStorage.setItem("groupId", value)
  }

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <SpreadsheetStep selectedReport={selectedReport} handleButtonClick={handleButtonClick} steps={steps} />;
      case 1:
        return <GroupTypeStep  steps={steps}  />;
      case 2:
        return <GroupSelectionStep classData={classData} handleGroupTitleChange={handleGroupTitleChange} />;
      case 3:
        return <DateRangeStep steps={steps}  startDate={startDate} endDate={endDate} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange}  />;
      case 4:
        return <GetSheetStep steps={steps} startDate={startDate}endDate={endDate} />;
      default:
        return <Typography>Unknown stepIndex</Typography>;
    }
  };

  const handleStartDateChange = (event) => {
    if (event.target.value <= endDate) {
      setStartDate(event.target.value);
    } else {
      setStartDate(endDate);
    }
  };
  
  const handleEndDateChange = (event) => {
    if (event.target.value >= startDate) {
      setEndDate(event.target.value);
    } else {
      setEndDate(startDate);
    }
  };

  return (
    <Box sx={{ maxWidth: 1400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={index === steps.length - 1 ? <Typography variant="caption">Last step</Typography> : null}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {renderStepContent(index)}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={index === steps.length - 1 ? handleContinue : handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Spreadsheets;
