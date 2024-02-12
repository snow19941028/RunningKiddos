import { useState } from 'react';

import { Select, Button, MenuItem, Typography, FormControl } from '@mui/material';

import LineComponent from '../lineGraph';
import ChartComponent from '../chartGraph';

function Progress() {
    const [showChart, setShowChart] = useState(1);
    const [selectedOptionDate, setSelectedOptionDate] = useState('Week');
    const [selectedOptionCourse, setSelectedOptionCourse] = useState('All Classes');
    const series = [
        { name: 'Large Testing Class', data: [44, 55, 41, 67, 22, 43, 12] },
        { name: 'Medium Testing Class', data: [13, 23, 20, 8, 13, 27, 12] },
        { name: 'Small Test Class', data: [11, 17, 15, 15, 21, 14, 12] },
        { name: 'XSmall Testing Class', data: [21, 7, 25, 13, 22, 8, 12] },
        { name: 'XLarge Testing Class', data: [23, 27, 5, 53, 32, 18, 12] }
      ];
    const labels = ['12-02', '12-02', '12-02', '12-12', '12-12', '12-23', '01-04'];
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
