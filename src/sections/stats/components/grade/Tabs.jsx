import * as React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import PartChart from './ParticipationChart';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Today" value="1" />
            <Tab label="Week" value="2" />
            <Tab label="Month" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><div style={{marginTop: '-5%'}}><PartChart /></div></TabPanel>
        <TabPanel value="2"><div style={{marginTop: '-5%'}}><PartChart /></div></TabPanel>
        <TabPanel value="3"><div style={{marginTop: '-5%'}}><PartChart /></div></TabPanel>
      </TabContext>
    </Box>
  );
}