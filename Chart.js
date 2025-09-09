import React from 'react';
import PropTypes from 'prop-types';

import Doughnut from './charts/Doughnut';
import Line from './charts/Line';
import Bar from './charts/Bar';

const supportedComponents = {
  Bar: Bar,
  Doughnut: Doughnut,
  Line: Line,
};

const Graph = (props) => {
  // Get padding to determine height
  const ref = React.useRef(null);
  const [padding, setPadding] = React.useState(0);

  React.useEffect(() => {
    const parentStyles = getComputedStyle(ref.current.parentElement);
    const paddingTop = parseInt(parentStyles.paddingTop.slice(0, -2));
    const paddingBottom = parseInt(parentStyles.paddingBottom.slice(0, -2));
    setPadding(paddingTop + paddingBottom);
  });

  // Get chart by type
  const Chart = supportedComponents[props.type];

  return (
    <div ref={ref} style={{ height: props.height - padding, width: '100%' }}>
      <Chart
        data={props.data}
        options={props.opts}
        altText={props.altText}
      ></Chart>
    </div>
  );
};

Graph.propTypes = {
  // config: PropTypes.object.isRequired,
  altText: PropTypes.string,
  height: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  opts: PropTypes.object.isRequired,
};

export default Graph;
