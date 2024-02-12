import PropTypes from "prop-types";
import React, { useState } from "react";

import { Tab, Box, Tabs, Typography } from "@mui/material";

import { Class } from "./components/class/Class";
import { Grade } from "./components/grade/Grade";
import { School } from "./components/school/School";

const tabStyles = {
  width: 'auto',
  height: '25pt',
  borderRadius: "45px",
  fontFamily: 'PingFang SC-Bold',
  color: '#333333',
  border: "none",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "15pt",
  marginRight: '10px',
  "&.Mui-selected": {
    backgroundColor: "#333333",
    border: "none",
    color: "#FFFFFF",
  },
};

const tabPanelStyles = {
  paddingLeft: 0,
};

const tabs = [
  { label: "School", component: <School /> },
  { label: "Class", component: <Class /> },
  { label: "Grade", component: <Grade /> }
];

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
  const [value, setValue] = useState(0); // Changed default value to 0 for the first tab

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{
          width: '100%',
          background: '#FFFFFF',
          padding: '5px',
          borderRadius: '90px',
          backgroundColor: '#FFFFFF',
          margin: '-5% 0 0 -3.5%',
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {tabs.map(({ label }, index) => (
          <Tab
            key={label}
            value={index}
            label={label}
            wrapped
            {...a11yProps(index)}
            sx={tabStyles}
          />
        ))}
      </Tabs>
      {tabs.map(({ label, component }, index) => (
        <TabPanel key={label} value={value} index={index} padding={0} sx={tabPanelStyles}>
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
