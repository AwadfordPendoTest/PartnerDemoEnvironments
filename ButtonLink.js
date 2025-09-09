import React from 'react';
import PropTypes from 'prop-types';

import MuiTooltip from '@mui/material/Tooltip';
import MuiButton from '@mui/material/Button';
import MuiIconButton from '@mui/material/IconButton';
import MuiBox from '@mui/material/Box';

import DynamicIcon from '../DynamicIcon';

const ButtonLink = (props) => {
  return (
    <>
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
            href={props.href}
            target={props.target || ''}
            aria-label={`${props.name}`}
          >
            <MuiBox style={{ ...props.textStyle }}>{props.name}</MuiBox>
            <DynamicIcon icon={props.icon}></DynamicIcon>
          </MuiIconButton>
        ) : (
          <MuiButton
            sx={{
              borderRadius: '5px',
              padding: '6px 30px',
              ...props.styles,
            }}
            {...props.opts}
            id={props.id}
            className={props.classes}
            color="inherit"
            href={props.href}
            target={props.target || ''}
            aria-label={`${props.name}`}
          >
            {props.name}
          </MuiButton>
        )}
      </MuiTooltip>
    </>
  );
};

ButtonLink.propTypes = {
  styles: PropTypes.object,
  textStyle: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  callback: PropTypes.func,
};

export default ButtonLink;
