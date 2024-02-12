import React from 'react';
import ReactApexChart from 'react-apexcharts';

function chartGraph({series, labels}) {
    const options = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: { show: true },
          zoom: { enabled: true }
        },
        responsive: [{
          breakpoint: 480,
          options: { legend: { position: 'bottom', offsetX: -10, offsetY: 0 } }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: { total: { enabled: true, style: { fontSize: '13px', fontWeight: 900 } } }
          },
        },
        xaxis: { type: 'string', categories: labels },
        legend: { position: 'right', offsetY: 40 },
        fill: { opacity: 1 }
      }

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}

export default chartGraph;
