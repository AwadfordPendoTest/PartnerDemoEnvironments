import React from 'react';
import PropTypes from 'prop-types';

import MuiBox from '@mui/material/Box';

const Text = (props) => {
  // Get padding to determine height
  const ref = React.useRef(null);
  const [padding, setPadding] = React.useState(0);
  const [cardContentHeight, setCardContentHeight] = React.useState(0);

  React.useEffect(() => {
    const parentStyles = getComputedStyle(ref.current.parentElement);
    const elementStyles = getComputedStyle(ref.current);
    const paddingTop = parseInt(parentStyles.paddingTop.slice(0, -2));
    const paddingBottom = parseInt(parentStyles.paddingBottom.slice(0, -2));
    setPadding(paddingBottom + paddingTop);
    setCardContentHeight(elementStyles.height.slice(0, -2));
  });

  // Controller for default text sizes - passing in config will override
  let maxTextSize = 20;
  if (cardContentHeight < 27) {
    maxTextSize = 12;
  } else if (cardContentHeight < 45) {
    maxTextSize = 16;
  }

  return (
    <MuiBox
      ref={ref}
      style={{
        maxWidth: '100%',
        ...props.sx,
      }}
      height={props.height - padding}
    >
      {props.header ? (
        <MuiBox
          style={{
            fontWeight: '700',
            fontSize: maxTextSize,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingBottom: '0px',
            ...props.headerStyle,
          }}
        >
          {props.header}
        </MuiBox>
      ) : (
        ''
      )}
      {props.subheader ? (
        <MuiBox
          style={{
            fontWeight: '500',
            fontSize: maxTextSize * 0.8,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...props.subheaderStyle,
          }}
        >
          {props.subheader}
        </MuiBox>
      ) : (
        ''
      )}

      {props.text ? (
        <MuiBox
          style={{
            fontWeight: '400',
            fontSize: maxTextSize * 0.6,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...props.textStyle,
          }}
        >
          {props.text}
        </MuiBox>
      ) : (
        ''
      )}
    </MuiBox>
  );
};

Text.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  text: PropTypes.string,
  headerStyle: PropTypes.object,
  subheaderStyle: PropTypes.object,
  textStyle: PropTypes.object,
  opts: PropTypes.object,
  height: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default Text;
