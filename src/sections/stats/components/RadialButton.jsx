import PropTypes from 'prop-types';
import Chart from "react-apexcharts";

function Radial({ width, series }) {
  const options = {
    plotOptions: {
      radialBar: {
        track: {
          background: "#f2f2f2",
          strokeWidth: "97%"
        },
        dataLabels: {
          show: true,
          total: {
            show: true,
            color: "#373d3f"
          },
          background: {
            color: "#FFFFFF"
          }
        },
      }
    }
  };

  return (
    <div className="donut">
      <Chart
        options={options}
        series={[series]}
        type="radialBar"
        width={width}
      />
    </div>
  );
}

Radial.propTypes = {
  width: PropTypes.number.isRequired,
  series: PropTypes.number.isRequired
};

export default Radial;
