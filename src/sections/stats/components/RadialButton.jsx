import PropTypes from 'prop-types';
import Chart from "react-apexcharts";

function Radial({ series, title }) {
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        }
      },
    },
    labels: [title],
  };

  return (
    <div className="donut">
      <Chart
        options={options}
        series={[series]}
        type="radialBar"
        width='180'
      />
    </div>
  );
}

Radial.propTypes = {
  series: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default Radial;
