import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import MuiToolbar from '@mui/material/Toolbar';
import MuiTypography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';

import NavSearch from './NavSearch';
import Button from '../../common/buttons/Button';

let supportedComponents = {
  NavSearch: NavSearch,
  Button: Button,
};

//Note: if no route is specified on the content, it will display on all pages

const AppBar = (props) => {
  // get current route
  const location = useLocation();

  // Wrapper for left aligned items
  const LeftWrapper = muiStyled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'left',
    padding: theme.spacing(1, 1, 1, 0),
    '> .nav-item:not(.MuiButton-contained):first-of-type': {
      paddingLeft: '0px',
    },
  }));

  // Wrapper for right aligned app bar items
  const RightWrapper = muiStyled('div')(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'right',
    padding: theme.spacing(1, 0, 1, 1),
    '> .nav-item:not(.MuiButton-contained):last-of-type': {
      paddingRight: '0px',
    },
  }));

  return (
    <MuiToolbar
      sx={{
        // flexDirection: { xs: 'column', sm: 'row' },
        paddingLeft: { xs: '10px', sm: '20px', md: '40px' },
        paddingRight: { xs: '10px', sm: '20px', md: '40px' },
        ...props.styles,
      }}
      {...props.opts}
      id={props.id}
      className={props.classes}
    >
      <LeftWrapper>
        {/* Left Aligned Items */}
        {props.contents
          .filter((d) => d.alignment === 'left')
          .map((d, i) => {
            // only include element if it is scoped to this page, or if no page restrictions are specified
            if (d.route === location.pathname || d.route === undefined) {
              let Component = supportedComponents[d.componentName];
              return (
                <div
                  key={`${d.componentName}-${i}`}
                  style={{ width: '100%' }}
                  className="nav-item"
                >
                  {Component ? (
                    <Component {...d}></Component>
                  ) : (
                    `Unsupported component type: ${d.componentName}`
                  )}
                </div>
              );
            } else {
              return;
            }
          })}
      </LeftWrapper>

      <RightWrapper>
        {/* Right Aligned Items */}
        {props.contents
          .filter((d) => d.alignment === 'right')
          .map((d, i) => {
            // only include element if it is scoped to this page, or if no page restrictions are specified
            if (d.route === location.pathname || d.route === undefined) {
              let Component = supportedComponents[d.componentName];
              return (
                <div key={`${d.componentName}-${i}`} className="nav-item">
                  {Component ? (
                    <Component {...d}></Component>
                  ) : (
                    `Unsupported component type: ${d.componentName}`
                  )}
                </div>
              );
            } else {
              return;
            }
          })}
      </RightWrapper>
    </MuiToolbar>
  );
};

AppBar.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  contents: PropTypes.array.isRequired,
};

export default AppBar;
