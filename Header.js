import React from 'react';
import PropTypes from 'prop-types';

import MuiAppBar from '@mui/material/AppBar';

import NavBar from './NavBar';
import AppBar from './AppBar';

const Header = (props) => {
  return (
    <MuiAppBar
      ref={props.innerRef}
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        boxShadow: 'none',
        paddingBottom: '40px',
        ...props.styles,
      }}
      {...props.opts}
      id={props.id}
      className={props.classes}
    >
      <NavBar {...props.navBar} pendoMetadata={props.pendoMetadata}></NavBar>
      {props.appBars.map((d, i) => {
        return <AppBar key={i} {...d}></AppBar>;
      })}
    </MuiAppBar>
  );
};

Header.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  navBar: PropTypes.object.isRequired,
  appBars: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired,
  pendoMetadata: PropTypes.object.isRequired,
};

export default Header;
