import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { account } from 'src/_mock/account';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const userName = localStorage.getItem("username");
  const userId = localStorage.getItem("userid");
  const userEmail = localStorage.getItem("useremail");

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.setItem("logstatus", false);
    window.location.href = '/login';
    localStorage.setItem("username",'')
    setOpen(null);
  };
  const handleCloseAdmin = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          // width: 250,
          borderRadius:90,
          background:'#FFFFFF',
        }}
      >
        <Avatar
          src={account.photoURL}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 'circle',
            opacity: 1,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
        <Typography color='#000000' gutterBottom 
          sx={{
            fontSize: 18,
            fontFamily: "PingFang SC, PingFang SC",
            fontWeight: 'bold',
            color: '#333333',
          }}
        >&nbsp;&nbsp;&nbsp; {userName} &nbsp;&nbsp;&nbsp;</Typography>
      </Button>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseAdmin}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userId}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userEmail}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
