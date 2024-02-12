import { useState } from "react";
import PropTypes from "prop-types";

import { Box,Tab, Tabs ,Typography} from "@mui/material";

import PDFReports from "./component/PDFReports/PDFReports";
import Spreadsheets from "./component/Spreadsheets/Spreadsheets";

const tabs = [
  { label: "PDF Reports", component: <PDFReports /> },
  { label: "Spreadsheets", component: <Spreadsheets /> },
];

const tabStyles = {
  width: 150,
  height: 30,
  borderRadius: "30px",
  background: '#F6F7F9',
  fontFamily: 'PingFang SC-Bold',
  color: '#333333',
  border: "none",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  marginRight: '10px',
  "&.Mui-selected": {
    backgroundColor: "#333333",
    border: "none",
    color: "#FFFFFF",
  },
};

const tabPanelStyles = {
  marginTop: '-10px',
  paddingLeft: 0,
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
  const [value, setValue] = useState("PDF_Reports");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        padding={0}
        sx={{
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
            sx={tabStyles}
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