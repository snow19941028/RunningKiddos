import React from 'react';

import { Grid, Button, Typography } from '@mui/material';

import PartContent from './PartContent';

function Participation() {
    return (
        <div>
            <Grid container className="titlebar" lg={12} sm={12} sx={{ padding: '15px 0 0 14px' }}>
                <Grid container alignItems="center" lg={6.5} >
                    <div>
                        <img src="assets/Stats/participation@2x.png" alt="Logo" />
                    </div>
                    <div>
                        <Typography
                            sx={{
                                fontSize: '21px',
                                fontFamily: 'DIN, DIN',
                                fontWeight: 'bold',
                                color: '#333333',
                                lineHeight: '18px',
                                margin: '5pt 0 0 5pt'
                            }}
                        >Participation</Typography>
                    </div>
                </Grid>
                <Grid container alignItems="right" justifyContent="flex-end" lg={5} >
                    <div>
                        <Button sx={{ backgroundColor: '#F8F8FA', borderRadius: '50%', minWidth: '40px', height: '40px' }} >
                            <img width={14} height={14} src="assets/Config/Config_Students/print.png" alt="Print" />
                        </Button>
                    </div>
                </Grid>
                <div style={{marginLeft: '15%'}}>
                    <PartContent/>
                </div>
            </Grid>
        </div>
    );
}
export default Participation;
