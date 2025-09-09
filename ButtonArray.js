import React from 'react';
import PropTypes from 'prop-types';

import MuiList from '@mui/material/List';
import Button from '../../common/buttons/Button';

const ButtonArray = (props) => {
  // Get padding to determine height
  const ref = React.useRef(null);
  const [padding, setPadding] = React.useState(0);

  React.useEffect(() => {
    const parentStyles = getComputedStyle(ref.current.parentElement);
    const paddingTop = parseInt(parentStyles.paddingTop.slice(0, -2));
    const paddingBottom = parseInt(parentStyles.paddingBottom.slice(0, -2));
    setPadding(paddingTop + paddingBottom);
  });

  let buttonCount = props.contents.length;

  return (
    <MuiList
      ref={ref}
      style={{ height: props.height - padding, width: '100%', padding: '0px' }}
    >
      {props.contents.map((d) => (
        <Button key={d.name} {...d} buttonCount={buttonCount}></Button>
      ))}
    </MuiList>
  );
};

ButtonArray.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  height: PropTypes.number.isRequired,
  options: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      styles: PropTypes.object,
      opts: PropTypes.object,
      id: PropTypes.string,
      classes: PropTypes.string,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      openStartCallback: PropTypes.func,
      closeEndCallback: PropTypes.func,
      header: PropTypes.object.isRequired,
      content: PropTypes.object,
    })
  ).isRequired,
};

export default ButtonArray;
