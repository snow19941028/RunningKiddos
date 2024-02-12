import PropTypes from "prop-types";
import React, { useState } from "react";

import { Tab, Box, Tabs, Grid, Button, Typography } from "@mui/material";

import { Week } from "./components/leader/Week";
import { Month } from "./components/leader/Month";
import { Today } from "./components/leader/Today";

const tabPanelStyles = {
  paddingLeft: 0,
  width: '10%',
  height: '400px',
  backgroundColor: 'black'
};

const tabs = [
  { label: "Today", component: <Today /> },
  { label: "Week", component: <Week /> },
  { label: "Month", component: <Month /> }
];
const print = () => {
  // Hide the print button before printing
  const printButton = document.querySelector('.print-button');
  if (printButton) printButton.style.display = 'none';

  // Print the content
  window.print();

  // Show the print button after printing
  if (printButton) printButton.style.display = 'block';
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} sx={{ paddingLeft: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CustomTab() {
  const [value, setValue] = useState("Today");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '107%', height: '103.7%', backgroundColor: '#FFFFFF', borderRadius: '20px', marginTop: '-55px', border: '1px solid #333333' }}>
      <Grid container className="titlebar" lg={12} sm={12} sx={{ padding: '15px 0 0 14px' }}>
        <Grid container alignItems="center" lg={6.5} >
          <div>
            <img src="assets/Class_School/LeaderboardTitle.png" alt="Logo" />
          </div>
          <div>
            <Typography
              sx={{
                fontSize: '26px',
                fontFamily: 'DIN, DIN',
                fontWeight: 'bold',
                color: '#333333',
                lineHeight: '18px',
              }}
            >Leaderboards</Typography>
          </div>
        </Grid>
        <Grid container alignItems="right" justifyContent="flex-end" lg={5} >
          <div>
            <Button sx={{ backgroundColor: '#F8F8FA', borderRadius: '50%', minWidth: '40px', height: '40px' }} onClick={print} >
              <img width={14} height={14} src="assets/Config/Config_Students/print.png" alt="Print" />
            </Button>
          </div>
        </Grid>
      </Grid>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{
          margin: '14px 0 0 11px',
          width: '94%',
          background: '#FFFFFF',
          borderRadius: '20px',
          backgroundColor: '#F6F7F9',
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {tabs.map(({ label }) => (
          <Tab
            key={label}
            value={label}
            label={label}
            wrapped
            {...a11yProps(label)}
            sx={{
              borderRadius: '20px',
              width: '33%',
              padding: '10px',
              fontSize: '15px',
              "&.Mui-selected": {
                backgroundColor: "#333333",
                border: "none",
                color: "#FFFFFF",
              },
            }}
          />

        ))}
      </Tabs>
      {tabs.map(({ label, component }) => (
        <TabPanel key={label} value={value} index={label} padding={0} sx={tabPanelStyles}>
          {component}
        </TabPanel>
      ))}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
