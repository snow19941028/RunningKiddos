import ReactApexChart from 'react-apexcharts';
import React, { useState, useEffect } from 'react';

export default function PartContent() {
  const series = [75];
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: 'black',
            fontWeight: '30',
            offsetY: 0
          },
          value: {
            offsetY: -40,
            fontSize: '32px',
            fontWeight: '5',
            color: undefined,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'horizontal',
        gradientToColors: ['#ABE5A1'],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      },
    },
    stroke: {
      dashArray: 3
    },
    labels: ['Participating'],
  };

  const renderDots = () => {
    const chartdiv = document.querySelector('#chart');
    const chart  = chartdiv.querySelector('.apexcharts-svg');
    if (chart) {
      const series_current = chart.querySelectorAll('.apexcharts-series');
      if (series_current.length > 0) {
        const circleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        const dotRadius = 2;
        const dotCount = 50;
        const dotSpacing = 3;
        console.log(series_current[0].nextElementSibling.getBoundingClientRect());

        const seriesBBox = series_current[0].nextElementSibling.getBoundingClientRect();
        const seriesCenterX = seriesBBox.left + seriesBBox.width / 2 -10;
        const seriesCenterY = seriesBBox.top + seriesBBox.height / 2;
        const radius = parseFloat(series_current[0].nextElementSibling.getAttribute('r'));
        const fontSize = 14;
        console.log("x");
        console.log(seriesCenterX);
        for (let i = 0; i < dotCount; i+=1) {
          const angle = ((i / (dotCount - 1)) * Math.PI) - Math.PI;
          const x = seriesCenterX + Math.cos(angle) * (radius - dotSpacing);
          
          const y = seriesCenterY + Math.sin(angle) * (radius - dotSpacing);
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', x);
          circle.setAttribute('cy', y);
          circle.setAttribute('r', dotRadius);
          circle.setAttribute('fill', 'black');
  
          circleGroup.appendChild(circle);
  
          if (i === 0 || i === 25 || i === 49) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            if(i === 0) {
              text.setAttribute('x', x + 10);
            }else if(i === 25){
              text.setAttribute('x', x - 4);
            }else{
              text.setAttribute('x', x - 15);
            }
            text.setAttribute('y', y + fontSize / 3 + (i === 25 ? 10 : 0));
            text.setAttribute('font-size', fontSize);
            text.setAttribute('fill', 'black');
            text.setAttribute('text-anchor', 'middle');
            if(i === 0) {
              text.textContent = '0';
            }else if(i === 25){
              text.textContent = '50';
            }else{
              text.textContent = '100';
            }
            circleGroup.appendChild(text);
          }
        }
        chart.appendChild(circleGroup);
      }
    }
  };
  
  const [windowResizing, setWindowResizing] = useState(false);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      setWindowResizing(true);

      timeout = setTimeout(() => {
        setWindowResizing(false);
      }, 200);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    renderDots();
  }, [windowResizing])
  
  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" height={450} />
    </div>
  );
}
