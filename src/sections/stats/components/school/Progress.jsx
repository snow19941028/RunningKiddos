import * as React from 'react';
import { useState } from 'react';

import { Grid, Select, MenuItem, Typography, FormControl } from '@mui/material';

// import { getStatClassProgress } from 'src/apis/api.stats';

import Graph from '../../Graph';

function Progress() {
    // const rowData = [
    //     { year: 2024, month: 1, day: 19, week: 2, timestamp: '2024-01-19T06:12:32.000Z', distanceInMiles: 122.7, distanceInUnits: 197.47 }
    // ];

    // const [chart, setChart] = useState([rowData]);
    // const schoolData = JSON.parse(localStorage.getItem('school'));
    // const schoolId = schoolData && schoolData.length > 0 ? schoolData[0].id : null;
    // console.log(schoolId);
    // const programId = localStorage.getItem('programId');
    const [selectedOption, setSelectedOption] = useState('Week');
    const labelWeek = ['11-12', '11-19', '12-17', '12-24', '12-31', '1-8', '1-6'];
    const labelDay = ['11-21', '11-22', '11-25', '11-26', '11-27', '11-30', '12-21', '12-22', '12-31', '1-2', '1-8', '1-5', '1-6'];
    const seriesDataWeek = [423, 359, 400, 427, 130, 260, 170];
    const seriesDataDay = [423, 359, 400, 427, 130, 260, 423, 359, 400, 427, 130, 260, 120];

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await getStatClassProgress(`https://api.runningkiddos.com/api/LapEntries/getEntriesBySchool?schoolId=${schoolId}&programId=${programId}`);
    //             setChart(res.data);
    //         } catch (error) {
    //             console.log('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [schoolId, programId]);

    return (
        <div style={{ margin: '0 0 0 -40px', border: '1px solid #333333', borderRadius: '20px', backgroundColor: '#FFFFFF', width: '102%' }}>
            <Grid xs={12} md={6} lg={8}>
                <div style={{ display: 'flex' }}>
                    <img src='assets/Stats/weekly@2x.png' alt='' style={{ width: '5%', height: '0%', margin: '2.5% 0 0 2%' }} />
                    <Typography style={{ width: '50%', fontSize: '20px', fontWeight: 'bold', margin: '13px 0 0 5px' }}>Weekly Progress</Typography>
                    <FormControl fullWidth>
                        <Select
                            sx={{
                                marginTop: '15px',
                                width: '100px',
                                height: '30px',
                                borderRadius: '20px',
                            }}
                            onChange={handleSelectChange}
                            value={selectedOption}
                        >
                            <MenuItem value='Week'>Week</MenuItem>
                            <MenuItem value='Day'>Day</MenuItem>
                        </Select>
                        {selectedOption === 'Week' && <div style={{ width: '230%', marginLeft: '-58%' }}>
                            <Graph
                                chart={{
                                    labels: labelWeek,
                                    series: [
                                        {
                                            type: 'column',
                                            fill: 'solid',
                                            data: seriesDataWeek
                                        }
                                    ],
                                }}
                                height={318}
                            />
                        </div>}
                        {selectedOption === 'Day' && <div style={{ width: '230%', marginLeft: '-58%' }}>
                            <Graph chart={{
                                labels: labelDay,
                                series: [
                                    {
                                        type: 'column',
                                        fill: 'solid',
                                        data: seriesDataDay
                                    }
                                ],
                            }}
                                height={318}
                            />
                        </div>}
                    </FormControl>
                </div>
            </Grid>
        </div>
    );
}
export default Progress;
