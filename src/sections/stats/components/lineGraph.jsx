import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';

import Graph from '../Graph';

function LineGraph({ labels, series }) {
    const seriesData = series.map((item) => ({
        name: item.name,
        type: 'line',
        fill: 'solid',
        data: item.data
    }))
    return (
        <div style={{ margin: '0 0 0 -40px', width: '120%' }}>
            <Grid xs={12} md={6} lg={8}>
                <Graph
                    style={{ width: '127.5%', borderRadius: '20px' }}
                    chart={{
                        labels,
                        series: seriesData
                    }}
                height = {318}
                />
            </Grid>
        </div>
    );
}
LineGraph.propTypes = {
    labels: PropTypes.object,
    series: PropTypes.object
};
export default LineGraph;
