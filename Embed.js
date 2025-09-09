import React from 'react';
import PropTypes from 'prop-types';

import MuiBox from '@mui/material/Box';
import MuiCircularProgress from '@mui/material/CircularProgress';

const Embed = (props) => {
  // Handle iframe loaded state
  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  // Clear iframe loaded bool on src updated
  React.useEffect(() => {
    setIframeLoaded(false);
  }, [props.src]);

  // Get padding to determine height
  const ref = React.useRef(null);
  const [padding, setPadding] = React.useState(0);

  React.useEffect(() => {
    const parentStyles = getComputedStyle(ref.current.parentElement);
    const paddingTop = parseInt(parentStyles.paddingTop.slice(0, -2));
    const paddingBottom = parseInt(parentStyles.paddingBottom.slice(0, -2));
    setPadding(paddingTop + paddingBottom);
  });

  let availableHeight;
  let loadingHeight;
  let srcFormatted = props.src;
  if (props.embedType !== 'Modal') {
    availableHeight = props.height - padding - 10;
    loadingHeight = props.height - padding;
    srcFormatted =
      props.src +
      '?playerColor=01003A&playButton=false&playbar=true&controlsVisibleOnLoad=true';
  } else {
    availableHeight = '100%';
    loadingHeight = '100px';
  }

  return (
    <>
      <MuiBox
        ref={ref}
        sx={{
          display: iframeLoaded ? 'initial' : 'none',
          border: 'none',
          color: 'red',
        }}
        height={availableHeight}
      >
        <iframe
          src={srcFormatted}
          title={props.title}
          onLoad={handleIframeLoad}
          width="100%"
          height={availableHeight}
          style={{ border: 'none' }}
        ></iframe>
      </MuiBox>

      <MuiBox
        sx={{
          display: iframeLoaded ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MuiCircularProgress
          size={loadingHeight}
          sx={{
            color: 'rgb(225, 227, 230)',
          }}
        ></MuiCircularProgress>
      </MuiBox>
    </>
  );
};

Embed.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.object,
  height: PropTypes.number,
  embedType: PropTypes.string,
};

export default Embed;
