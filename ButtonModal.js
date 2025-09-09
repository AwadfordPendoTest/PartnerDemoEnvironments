import React from 'react';
import PropTypes from 'prop-types';

import MuiTooltip from '@mui/material/Tooltip';
import MuiButton from '@mui/material/Button';
import MuiIconButton from '@mui/material/IconButton';

import DynamicIcon from '../DynamicIcon';
import Modal from '../modals/Modal';

const ButtonModal = (props) => {
  // May need to reproduce this button sizing logic for Link/Menu if they get used in array!
  const ref = React.useRef(null);
  let additionalStyles;

  if (props.buttonCount) {
    // Get padding to determine height
    const [padding, setPadding] = React.useState(0);
    const [buttonHeight, setButtonHeight] = React.useState(0);
    React.useEffect(() => {
      const parentOfParentStyles = getComputedStyle(
        ref.current.parentElement.parentElement
      );
      const paddingTop = parseInt(parentOfParentStyles.paddingTop.slice(0, -2));
      const paddingBottom = parseInt(
        parentOfParentStyles.paddingBottom.slice(0, -2)
      );
      const parentHeight = parseInt(parentOfParentStyles.height.slice(0, -2));
      setPadding(paddingTop + paddingBottom);
      setButtonHeight((parentHeight - padding) / props.buttonCount - 5);
    });
    additionalStyles = {
      height: buttonHeight,
      minHeight: '25px',
      marginTop: '2.5px',
      marginBottom: '5px',
    };
  }

  // Handle modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    // Call optional open start callback
    if (props.openStartCallback) {
      props.openStartCallback();
    }

    setOpen(true);

    // Call optional open end callback
    if (props.openEndCallback) {
      props.openEndCallback();
    }
  };
  const handleClose = () => {
    // Call optional open start callback
    if (props.closeStartCallback) {
      props.closeStartCallback();
    }

    setOpen(false);

    // Call optional open end callback
    if (props.closeEndCallback) {
      props.closeEndCallback();
    }
  };

  return props.displayIndicator || props.displayIndicator === undefined ? (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        header={props.header}
        content={props.content}
      ></Modal>
      <MuiTooltip title={props.tooltipText} ref={ref}>
        {props.icon ? (
          <MuiIconButton
            sx={{
              ...props.styles,

              ...additionalStyles,
            }}
            {...props.opts}
            id={props.id}
            className={props.classes}
            color="inherit"
            onClick={handleOpen}
            aria-label={`${props.name}`}
          >
            <DynamicIcon icon={props.icon}></DynamicIcon>
          </MuiIconButton>
        ) : (
          <MuiButton
            sx={{
              borderRadius: '5px',
              padding: '6px 40px',
              ...props.styles,
              ...additionalStyles,
            }}
            {...props.opts}
            id={props.id}
            className={props.classes}
            color="inherit"
            onClick={handleOpen}
            aria-label={`${props.name}`}
          >
            {props.name}
          </MuiButton>
        )}
      </MuiTooltip>
    </>
  ) : (
    ''
  );
};

ButtonModal.propTypes = {
  displayIndicator: PropTypes.bool,
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  openStartCallback: PropTypes.func,
  openEndCallback: PropTypes.func,
  closeStartCallback: PropTypes.func,
  closeEndCallback: PropTypes.func,
  header: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  buttonCount: PropTypes.number,
};

export default ButtonModal;
