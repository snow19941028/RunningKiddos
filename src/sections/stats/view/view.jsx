import * as React from 'react';

import { Box, Grid } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import CustomTab from '../CustomTab';
import LeaderBoards from '../LeaderBoards';
import { HEADER } from '../../../layouts/dashboard/config-layout';

// ----------------------------------------------------------------------

const SPACING = 30;

export default function StatsView() {

  const lgUp = useResponsive('up', 'lg');

  return (
    <Box padding={0}
      sx={{
          marginTop: `${HEADER.H_MOBILE + SPACING}px`,
          marginBottom: '20px',
          // background: '#FFFFFF',
          borderRadius: '20px',
          opacity: 1,
          flexGrow: 1,
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          ...(lgUp && {
            px: 2,
            paddingTop: '29px',
            paddingLeft: '41px',
          }),
        }}
    >
      {/* <Box lg = {8} sm = {12} sx={{justifyContent: 'space-around'}}> */}
        <Grid container>
          <Grid lg = {8} sx={{}}>
            <CustomTab />
          </Grid>
          <Grid lg = {3.7}>
              <LeaderBoards />
          </Grid> 
        </Grid>
      {/* </Box> */}
    </Box>
  );
}
