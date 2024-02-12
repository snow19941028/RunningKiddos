import * as React from 'react';

import { Box, Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';

import Class from './Class';
import Grade from './Grade';

export function Month() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Class" value="1" style={{width: '50%', fontSize: '15pt'}} />
            <Tab label="Grade" value="2" style={{width: '50%', fontSize: '15pt' }} />
          </TabList>
        </Box>
        <TabPanel value="1"><Class /></TabPanel>
        <TabPanel value="2"><Grade /></TabPanel>
      </TabContext>
    </Box>
  );
}
