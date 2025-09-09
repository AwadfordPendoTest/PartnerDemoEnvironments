import React from 'react';
import PropTypes from 'prop-types';

import MuiTooltip from '@mui/material/Tooltip';
import MuiIconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';
import MuiMenu from '@mui/material/Menu';

import DynamicIcon from '../DynamicIcon';
import MenuItem from './menu-items/MenuItem';

const menuItems = [
  { name: 'Add New Account', type: 'Modal' },
  { name: 'Add New Contact', type: 'Modal' },
  { name: 'Add New Opportunity', type: 'Link' },
];

const ButtonMenu = (props) => {
  // State management for open/close state of menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            }}
            {...props.opts}
            id={props.id}
            className={props.classes}
            color="inherit"
            aria-label={`${props.name}`}
          >
            {props.name}
          </MuiButton>
        )}
      </MuiTooltip>
      <MuiMenu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            handleClose={handleClose}
            {...item}
          ></MenuItem>
        ))}
      </MuiMenu>
    </>
  );
};

ButtonMenu.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  tooltipText: PropTypes.string,
  callback: PropTypes.func,
};

export default ButtonMenu;
