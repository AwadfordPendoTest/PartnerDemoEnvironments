import React from 'react';
import PropTypes from 'prop-types';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar as ChartJSBar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Bar = (props) => {
  return (
    <ChartJSBar
      data={props.data}
      options={props.options}
      aria-label={props.altText}
    ></ChartJSBar>
  );
};

Bar.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  altText: PropTypes.string,
};

export default Bar;
