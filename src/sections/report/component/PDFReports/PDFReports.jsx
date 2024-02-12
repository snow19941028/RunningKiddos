import React, { useState, useEffect } from 'react';

import { Box, Step, Paper, Button, Stepper, StepLabel, Typography, StepContent } from '@mui/material';

import { ScanningSession,getClassSectionPart } from 'src/apis/api.report';

import GetReportStep from './GetReportStep';
import GroupTypeStep from '../GroupTypeStep';
import DateRangeStep from '../DateRangeStep';
import ReportTypeStep from './ReportTypeStep';
import SelectSessionStep from './SelectSessionStep';
import GroupSelectionStep from '../GroupSelectionStep';

const PDFReports = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);

  const [steps, setSteps] = useState([
    {
      label: 'Select Report Type',
      buttons: [
        { label: 'Distance' },
        { label: 'Laps' },
        { label: 'Time' },
        { label: 'Monthly Participation' },
        { label: 'Daily Participation' },
        { label: 'Group Averages' },
        { label: 'Student Monthly Progress' },
        { label: 'Student Daily Progress' },
        { label: 'Individual Student Report' },
      ],
    },
    {
      label: 'Select Group Type',
      buttons: [
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
        { label: 'Get Report' },]
    }
  ]);

  const [classData, setClassData] = useState([]);
  const schoolData = JSON.parse(localStorage.getItem('school'));
  const schoolId = schoolData && schoolData.length > 0 ? schoolData[0].id : null;

  const [groupType, setGroupType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const programId       = localStorage.getItem("programId")
  
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

  const handleButtonClick = async (reportLabel) => {
    setSelectedReport(reportLabel);

    if (reportLabel === 'Time') {
      setSteps([
        {
          label: 'Select Report Type',
          buttons: [
            { label: 'Distance', },
            { label: 'Laps', },
            { label: 'Time', },
            { label: 'Monthly Participation', },
            { label: 'Daily Participation' },
            { label: 'Group Averages', },
            { label: 'Student Monthly Progress', },
            { label: 'Student Daily Progress', },
            { label: 'Individual Student Report', },
          ],
        },
        { label: 'Select Sessions(1)', buttons: [] },
        {
          buttons: [
            { label: 'Get Report', }]
        }
      ]);
      const filterParam = `{"where":{"programId":${programId}},"include":"devices","order":"startDate DESC, deviceId DESC"}`

      await ScanningSession(`ScanningSessions`,{filter:filterParam})
          .then(res =>{
            console.log(res);
            setClassData(res.data);            
            
        }).catch(err => {
            alert('error');
            console.log(err)
        });
            
    }  else {
      setSteps([
        {
          label: 'Select Report Type',
          buttons: [
            { label: 'Distance' },
            { label: 'Laps' },
            { label: 'Time' },
            { label: 'Monthly Participation' },
            { label: 'Daily Participation' },
            { label: 'Group Averages' },
            { label: 'Student Monthly Progress' },
            { label: 'Student Daily Progress' },
            { label: 'Individual Student Report' },
          ],
        },
        {
          label: 'Select Group Type',
          buttons: [
            { label: 'Class' },
            { label: 'Grade' },
          ],
        },
        {
          label: 'Select Group',
        },
        {
          label: 'Select Data Range',
          buttons: [
            { label: 'Today' },
            { label: 'This Week' },
            { label: 'This Month' },
          ],
        },
        {
          buttons: [
            { label: 'Get Report' }]
        }
      ]);
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
        return <ReportTypeStep selectedReport={selectedReport} handleButtonClick={handleButtonClick} steps={steps} />;
      case 1:
        if (selectedReport === "Time")
          return <SelectSessionStep />;
        return <GroupTypeStep  steps={steps}  groupType={groupType} handleGroupType={handleGroupType}/>;
      case 2:
        if (selectedReport === "Time")
          return <GetReportStep  steps={steps} groupType={groupType} startDate={startDate} endDate={endDate}  />;
        return <GroupSelectionStep classData={classData} handleGroupTitleChange={handleGroupTitleChange} />;
      case 3:
        return <DateRangeStep steps={steps}  startDate={startDate} endDate={endDate} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange}  />;
      case 4:
        return <GetReportStep steps={steps} startDate={startDate}endDate={endDate} />;
      default:
        return <Typography>Unknown stepIndex</Typography>;
    }
  };

  function handleGroupType(buttonLabel){
    setGroupType(buttonLabel);
  }

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

export default PDFReports;
