import React from 'react';
import PropTypes from 'prop-types';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut as ChartJSDoughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnut = (props) => {
  return (
    <ChartJSDoughnut
      data={props.data}
      options={props.options}
      aria-label={props.altText}
    ></ChartJSDoughnut>
  );
};

Doughnut.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  altText: PropTypes.string,
};

export default Doughnut;
