import * as React from 'react';
import { useState, useEffect } from 'react';

import { Grid, Button, Typography } from '@mui/material';

import { getStatLeaderClass } from 'src/apis/api.stats';

function Average() {
    const rowData = [
        {schoolId: 6961,
        distanceInMiles: 13006.2,
        distanceInUnits: 20931.46,
        averageInMilesPerWeek: 4335.4,
        averageInUnitsPerWeek: 6977.15,
        averageInMilesPerDay: 619.34,
        averageInUnitsPerDay: 996.74,
        averageInMilesPerChildPerDay: 0.84,
        averageInUnitsPerChildPerDay: 1.35}
    ];
    const schoolData = JSON.parse(localStorage.getItem('school'));
    const schoolId = schoolData && schoolData.length > 0 ? schoolData[0].id: null;
    const programId = localStorage.getItem('programId');
    const [average, setAverage] = useState([rowData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStatLeaderClass(`https://api.ezmileageclub.com/api/Schools/getAverageMiles?schoolId=${schoolId}&programId=${programId}`);
                setAverage(res.data);
                // console.log(res.data);
            }catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [schoolId, programId])
    return (
        // {average.map((row) => (
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
                        >School TItle and Average</Typography>
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
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', margin: '3% 0 0 5%' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', padding: '7px 0 0 9px', backgroundColor: '#8FB0F2' }}>
                        <img src='assets/Stats/S_A_1@2x.png' alt='enrollment' />
                    </div>
                    <div>
                        <Typography sx={{ fontSize: '18px', marginLeft: '20px' }}>{`${average[0].schoolId}`}</Typography>
                        <Typography sx={{ fontSize: '13px', marginLeft: '20px' }}>Enrollment</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', margin: '3% 0 0 5%' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', padding: '7px 0 0 9px', backgroundColor: '#8FB0F2' }}>
                        <img src='assets/Stats/S_A_Report@2x.png' alt='enrollment' />
                    </div>
                    <div>
                        <div>
                            <Typography sx={{ fontSize: '18px', marginLeft: '20px' }}>{`${average[0].schoolId}`}</Typography>
                            <Typography sx={{ fontSize: '13px', marginLeft: '20px' }}>Reported School Population</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', margin: '5% 0 0 5%' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', padding: '10px 0 0 10px', backgroundColor: '#B9EC51' }}>
                        <img src='assets/Stats/total@2x.png' alt='enrollment' />
                    </div>
                    <div>
                        <Typography sx={{ fontSize: '18px', marginLeft: '20px' }}>{`${average[0].distanceInMiles}`}</Typography>
                        <Typography sx={{ fontSize: '13px', marginLeft: '20px' }}>Total Miles</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', margin: '5% 0 0 5%' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', padding: '7px 0 0 9px', backgroundColor: '#F6F7F9' }}>
                        <img src='assets/Stats/每周 1@2x.png' alt='enrollment' />
                    </div>
                    <div>
                        <div>
                            <Typography sx={{ fontSize: '18px', marginLeft: '20px' }}>{`${average[0].averageInMilesPerWeek}`}</Typography>
                            <Typography sx={{ fontSize: '13px', marginLeft: '20px' }}>Miles/Week</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', margin: '5% 0 0 5%' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', padding: '7px 0 0 9px' }}>
                        <img src='assets/Stats/rcd-day 1@2x.png' alt='enrollment' />
                    </div>
                    <div>
                        <Typography sx={{ fontSize: '18px', marginLeft: '20px' }}>{`${average[0].averageInMilesPerDay}`}</Typography>
                        <Typography sx={{ fontSize: '13px', marginLeft: '20px' }}>Miles/Day</Typography>
                    </div>
                </div>
                <div style={{ display: 'flex', margin: '5% 0 0 6%' }}>
                    <div style={{ width: '47px', height: '47px', borderRadius: '50%', padding: '7px 0 0 9px' }}>
                        <img src='assets/Stats/child 1@2x.png' alt='enrollment' />
                    </div>
                    <div>
                        <div>
                            <Typography sx={{ fontSize: '18px', marginLeft: '20px' }}>{`${average[0].averageInMilesPerChildPerDay}`}</Typography>
                            <Typography sx={{ fontSize: '13px', marginLeft: '20px' }}>Miles/Child/Day</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // ))}
    );
}
export default Average;