import React from 'react';

import Graph from '../../Graph';

function PartChart() {
    return (
        <Graph chart={{
            labels: [
                'Second',
                'Kindergarten',
                'First',
                'Fifth',
                'Eleventh',
            ],
            series: [
                {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [423, 359, 400, 427, 410],
                }
            ],
        }}
            height={145}
        />
    );
}
export default PartChart;