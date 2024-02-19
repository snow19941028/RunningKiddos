import React, { useState, useEffect } from 'react';

import { Grid, Button, Typography } from '@mui/material';

import { getStatLeaderClass } from 'src/apis/api.stats';

import RadialButton from '../RadialButton';

function Average() {
    const rowData = [
        { rank: 1, name: 'Large Testing Class', distanceInUnits: 9675.86 }
    ];
    const programId = localStorage.getItem('programId');
    const [classes, setClasses] = useState([rowData]);
    const [totalMile, setTotalMile] = useState(0);
    const [titleValue, setTitleValue] = useState('');
    const [mileValue, setMileValue] = useState(0);
    const handleTagClick = (tag) => {
        const selectedClass = classes.find(row => row.name === tag);
        if (selectedClass === undefined) {
            setMileValue('0');
        } else if (selectedClass) {
            setMileValue(selectedClass.distanceInUnits);
        }
        setTitleValue(tag);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                let total = 0;
                const res = await getStatLeaderClass(`https://api.runningkiddos.com/api/Groups/getLeaderboard?programId=${programId}&groupType=Class`);
                setClasses(res.data);
                classes.forEach((row) => {
                    total += row.distanceInUnits;
                });
                setTotalMile(total);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [programId, classes]);
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
            <div style={{ display: 'flex', marginLeft: '70%' }}>
                <Typography sx={{ fontSize: '23pt' }}>{mileValue}mi</Typography>
            </div>
            <div style={{ height: '20px' }}>
                <Typography variant='h6' sx={{ textAlign: 'right' }}>{titleValue}</Typography>
            </div>
            <Grid container lg={12} md={12} sm={12} xl={12} xs={12} style={{ margin: '5% 0 0 -8.5%' }}>
                {classes.map((row) => (
                    <Grid key={row.name} lg={3} md={3} sm={3} xl={3} xs={3}>
                        <div role="button" tabIndex={0} onClick={() => handleTagClick(row.name)} onKeyDown={() => handleTagClick(row.name)} style={{ cursor: 'pointer' }}>
                            <RadialButton series={Math.floor(row.distanceInUnits * 1000 / totalMile) / 10} title='Total' />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default Average;
