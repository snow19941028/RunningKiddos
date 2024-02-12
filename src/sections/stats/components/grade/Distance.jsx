import React from 'react';

import { Grid, Button, Typography } from '@mui/material';

import RadialButton from '../RadialButton';

function Distance() {
    return (
        <div>
            <Grid container className="titlebar" lg={12} sm={12} sx={{ padding: '15px 0 0 14px' }}>
                <Grid container alignItems="center" lg={6.5}>
                    <div>
                        <img src="assets/Stats/S_Average@2x.png" alt="Logo" />
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
                        >Distance</Typography>
                    </div>
                </Grid>
                <Grid container alignItems="right" justifyContent="flex-end" lg={5} >
                    <div>
                        <Button sx={{ backgroundColor: '#F8F8FA', borderRadius: '50%', minWidth: '40px', height: '40px' }} >
                            <img width={14} height={14} src="assets/Config/Config_Students/print.png" alt="Print" />
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <div style={{display: 'flex', marginLeft: '70%'}}> 
                <Typography sx={{fontSize: '23pt'}}>234.54</Typography>
                <Typography sx={{margin: '11.5% 0 0 5%'}}>mi</Typography>
            </div>
            <Grid container lg={12} md={12} sm={12} xl={12} xs={12} style={{ justifyContent: 'space-between', display: 'flex', margin: '5% 0 0 -9%' }}>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <div><RadialButton width={180} series={36} /></div>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <div><RadialButton width={180} series={26} /></div>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <div><RadialButton width={180} series={41} /></div>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <div><RadialButton width={180} series={16} /></div>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <div><RadialButton width={180} series={12} /></div>
                </Grid>
            </Grid>
            <Grid container lg={12} md={12} sm={12} xl={12} xs={12} style={{ justifyContent: 'space-between', display: 'flex', margin: '-2% 0 0 5%' }}>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <Typography>Large</Typography>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <Typography>Medium</Typography>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <Typography>Small</Typography>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <Typography>XSmall</Typography>
                </Grid>
                <Grid lg={2.4} md={2.4} sm={2.4} xl={2.4} xs={2.4}>
                    <Typography>XLarge</Typography>
                </Grid>
            </Grid>
        </div>
    );
}
export default Distance;
