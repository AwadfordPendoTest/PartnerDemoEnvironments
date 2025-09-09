import React from 'react';
import PropTypes from 'prop-types';

import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';

import MenuItemLink from './MenuItemLink';
import MenuItemModal from './MenuItemModal';

const MenuItem = (props) => {
  // Pick menu item based on specified type
  let Component;
  switch (props.type) {
    case 'Link':
      Component = MenuItemLink;
      break;
    case 'Modal':
      Component = MenuItemModal;
      break;
    default:
      Component = (
        <MuiMenuItem
          onClick={function () {
            props.handleClose();
          }}
        >
          <MuiTypography textAlign="center">{props.name}</MuiTypography>
        </MuiMenuItem>
      );
      break;
  }

  return (
    <>
      <Component {...props}></Component>
    </>
  );
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MenuItem;
