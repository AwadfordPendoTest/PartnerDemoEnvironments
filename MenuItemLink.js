import React from 'react';
import PropTypes from 'prop-types';

import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';

const MenuItemLink = (props) => {
  return (
    <>
      <MuiMenuItem
        key={props.name}
        href={'https://www.google.com'}
        // onClick={function () {
        //   props.handleClose();
        // }}
      >
        <MuiTypography textAlign="center">{props.name}</MuiTypography>
      </MuiMenuItem>
    </>
  );
};

MenuItemLink.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MenuItemLink;
