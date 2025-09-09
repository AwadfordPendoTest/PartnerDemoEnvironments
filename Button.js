import React from 'react';
import PropTypes from 'prop-types';

import MuiTooltip from '@mui/material/Tooltip';
import MuiIconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';

import DynamicIcon from '../DynamicIcon';
import ButtonMenu from './ButtonMenu';
import ButtonLink from './ButtonLink';
import ButtonModal from './ButtonModal';

const Button = (props) => {
  // Pick button based on specified type
  let Button;
  switch (props.type) {
    case 'Menu':
      Button = ButtonMenu;
      break;
    case 'Link':
      Button = ButtonLink;
      break;
    case 'Modal':
      Button = ButtonModal;
      break;
    default:
      Button = (
        <MuiTooltip title={props.tooltipText}>
          {props.icon ? (
            <MuiIconButton
              sx={{
                ...props.styles,
              }}
              {...props.opts}
              id={props.id}
              className={props.classes}
              color="inherit"
            >
              <DynamicIcon icon={props.icon}></DynamicIcon>
            </MuiIconButton>
          ) : (
            <MuiButton
              sx={{
                borderRadius: '5px',
                padding: '6px 40px',
                ...props.styles,
              }}
              {...props.opts}
              id={props.id}
              className={props.classes}
              color="inherit"
            >
              {props.name}
            </MuiButton>
          )}
        </MuiTooltip>
      );
      break;
  }

  // console.log('buttonprops', props);
  return (
    <>
      <Button {...props}></Button>
    </>
  );
};

Button.propTypes = {
  displayIndicator: PropTypes.bool,
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  buttonCount: PropTypes.number,
};

export default Button;
