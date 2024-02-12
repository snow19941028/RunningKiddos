import { useState } from 'react';

import { Select, Button, MenuItem, Typography, FormControl } from '@mui/material';

import LineComponent from '../lineGraph';
import ChartComponent from '../chartGraph';

function Progress() {
    const [showChart, setShowChart] = useState(1);
    const [selectedOptionDate, setSelectedOptionDate] = useState('Week');
    const [selectedOptionCourse, setSelectedOptionCourse] = useState('All Classes');
    const series = [
        { name: 'Pre-School', data: [44, 55, 41, 67, 22, 43, 12] },
        { name: 'Kindergarten', data: [13, 23, 20, 8, 13, 27, 12] },
        { name: 'First', data: [11, 17, 15, 15, 21, 14, 12] },
        { name: 'Second', data: [21, 7, 25, 13, 22, 8, 12] },
        { name: 'Third', data: [23, 27, 5, 53, 32, 18, 12] },
        { name: 'Fourth', data: [13, 51, 11, 17, 21, 43, 2] },
        { name: 'Fifth', data: [31, 13, 14, 21, 13, 23, 14] },
        { name: 'Sixth', data: [16, 23, 23, 25, 13, 12, 15] },
        { name: 'Seventh', data: [21, 17, 5, 23, 12, 18, 2] },
        { name: 'Eighth', data: [3, 2, 5, 5, 3, 8, 22] },
        { name: 'Ninth', data: [4, 5, 1, 7, 2, 3, 2] },
        { name: 'Tenth', data: [3, 3, 2, 8, 3, 7, 1] },
        { name: 'Eleventh', data: [1, 17, 17, 19, 25, 4, 2] },
        { name: 'Early5s', data: [21, 27, 5, 3, 22, 18, 12] },
        { name: 'None', data: [3, 21, 51, 21, 32, 8, 32] },
        { name: 'Other', data: [13, 17, 25, 5, 12, 12, 12] }
      ];
    const labels = ['11-06', '11-13', '12-11', '12-18', '12-25', '01-08', '01-15'];
    const ChartIconClick = () => { // Corrected function name
        setShowChart(1);
    };

    const LineIconClick = () => {
        setShowChart(2);
    };
    const handleSelectChangeD = (event) => {
        setSelectedOptionDate(event.target.value);
    }
    const handleSelectChangeC = (event) => {
        setSelectedOptionCourse(event.target.value)
    }
    return (
        <div style={{ margin: '0 0 0 -40px', width: '102%', borderRadius: '20px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex' }}>
                <img src='assets/Stats/weekly@2x.png' alt='' style={{ width: '5%', height: '0%', margin: '2.5% 0 0 2%' }} />
                <Typography style={{ width: '50%', fontSize: '20px', fontWeight: 'bold', margin: '2.5% 0 0 2%' }}>Weekly</Typography>
                <FormControl fullWidth>
                    <Select
                        sx={{
                            marginTop: '30px',
                            width: '100px',
                            height: '30px',
                            borderRadius: '20px',
                            textAlign: 'center'
                        }}
                        onChange={handleSelectChangeD}
                        value={selectedOptionDate}
                    >
                        <MenuItem value='Week'>Week</MenuItem>
                        <MenuItem value='Day'>Day</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <Select
                        sx={{
                            margin: '30px 0 0 -50%',
                            width: '140px',
                            height: '30px',
                            borderRadius: '20px',
                            textAlign: 'center'
                        }}
                        onChange={handleSelectChangeC}
                        value={selectedOptionCourse}
                    >
                        <MenuItem value='All Classes'>All Classes</MenuItem>
                        <MenuItem value='All Grades'>All Grades</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={ChartIconClick}>
                    <img src='assets/Stats/排行 1@2x.png' alt='' style={{ width: '60%', height: '60%', margin: '30% 0 0 2%' }} />
                </Button>
                <Button onClick={LineIconClick}>
                    <img src='assets/Stats/Group 42310@2x.png' alt='' style={{ width: '45%', height: '45%', margin: '25% 2.5% 0 1%' }} />
                </Button>
            </div>
            <div style={{ width: '98%' }}>
                {showChart === 1 ? <ChartComponent series={series} labels={labels} /> : <div style={{ width: '98%', marginLeft: '5%' }}><LineComponent series={series} labels={labels} /></div>}
            </div>
        </div>
    );
}

export default Progress;
