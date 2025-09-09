import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MuiToolbar from '@mui/material/Toolbar';
import MuiIconButton from '@mui/material/IconButton';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiMenuIcon from '@mui/icons-material/Menu';
import MuiTypography from '@mui/material/Typography';
import MuiDrawer from '@mui/material/Drawer';
import MuiList from '@mui/material/List';
import { styled as muiStyled } from '@mui/material/styles';
import NavTitle from './NavTitle';
import Button from '../../common/buttons/Button';
import NavAvatar from './NavAvatar';
import NavListLink from './NavListLink';
import NavListCustom from './NavListCustom';

let supportedComponents = {
  NavTitle: NavTitle,
  NavAvatar: NavAvatar,
  Button: Button,
};

const NavBar = (props) => {
  // Current location in router used to select navigation button
  const location = useLocation();

  // Handle resize of left/right wrappers to determine when to display drawer
  const leftWrapperRef = React.useRef(null);
  const [leftWrapperWidth, setLeftWrapperWidth] = React.useState(0);

  const handleLeftWrapperResized = () => {
    // Only update left wrapper width while drawer is closed so that you can re-open when expanding past the required width
    if (
      leftWrapperRef.current.offsetWidth !== leftWrapperWidth &&
      !drawerMenuIconDisplayed
    ) {
      setLeftWrapperWidth(leftWrapperRef.current.offsetWidth);
    }
  };

  const leftWrapperObserver = new ResizeObserver(handleLeftWrapperResized);

  React.useEffect(() => {
    leftWrapperObserver.observe(leftWrapperRef.current);

    return function cleanup() {
      leftWrapperObserver.disconnect();
    };
  });

  const rightWrapperRef = React.useRef(null);
  const toolbarRef = React.useRef(null);

  const getToolbarOffset = (toolbarEl) => {
    if (toolbarEl) {
      const computedStyle = window.getComputedStyle(toolbarEl);
      return (
        parseInt(computedStyle.paddingLeft, 10) +
        parseInt(computedStyle.paddingRight, 10) +
        parseInt(computedStyle.marginLeft, 10) +
        parseInt(computedStyle.marginRight, 10)
      );
    } else {
      return 0;
    }
  };

  // Handle window resize
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
      if (
        leftWrapperWidth +
          rightWrapperRef.current.clientWidth +
          getToolbarOffset(toolbarRef.current) >=
        window.innerWidth
      ) {
        setDrawerMenuIconDisplayed(true);
      } else {
        setDrawerMenuIconDisplayed(false);
      }
    }

    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
  });

  // Handle state for nav drawer
  const [drawerMenuIconDisplayed, setDrawerMenuIconDisplayed] =
    React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Wrapper for left aligned nav bar items
  const LeftWrapper = muiStyled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    padding: theme.spacing(1, 1, 1, 0),
    '> .nav-item:not(.MuiButton-contained):first-of-type *': {
      paddingLeft: '0px',
    },
  }));

  // Wrapper for right aligned nav bar items
  const RightWrapper = muiStyled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    padding: theme.spacing(1, 0, 1, 1),
    '> .nav-item:not(.MuiButton-contained):last-of-type *': {
      paddingRight: '0px',
    },
  }));

  // Styled menu items
  const StyledMenuItem = muiStyled(MuiMenuItem)(({ theme }) => ({
    borderRadius: '5px',
    '&.Mui-selected': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  }));

  // Render contents of bar based on alignment
  const renderContentsWithAlignment = (alignment) => {
    return props.contents
      .filter((d) => d.alignment === alignment)
      .map((d, i) => {
        let Component = supportedComponents[d.componentName];
        return (
          <div key={`${d.componentName}-${i}`} className="nav-item">
            {Component ? (
              <Component {...d} pendoMetadata={props.pendoMetadata}></Component>
            ) : (
              `Unsupported component type: ${d.componentName}`
            )}
          </div>
        );
      });
  };

  return (
    <>
      <MuiToolbar
        sx={{
          // flexDirection: { xs: 'column', sm: 'row' },
          paddingLeft: { xs: '10px', sm: '20px', md: '40px' },
          paddingRight: { xs: '10px', sm: '20px', md: '40px' },
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          justifyContent: 'space-between',
          ...props.styles,
        }}
        {...props.opts}
        id={props.id}
        className={props.classes}
        ref={toolbarRef}
      >
        {/* Slide out drawer */}
        <MuiDrawer
          sx={{
            '& .MuiDrawer-paper': {
              width: '240px',
              paddingTop: '25px',
            },
          }}
          variant="temporary"
          onClose={handleDrawerToggle}
          open={drawerOpen}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {
            <MuiList>
              {props.navItems.map((d) =>
                d.type === 'route' ? (
                  <NavListLink key={d.name} {...d}></NavListLink>
                ) : (
                  <NavListCustom key={d.name} {...d}></NavListCustom>
                )
              )}
            </MuiList>
          }
        </MuiDrawer>

        <LeftWrapper ref={leftWrapperRef} aria-label="menubar">
          {/* Nav Drawer Button */}
          {drawerMenuIconDisplayed ? (
            <MuiIconButton color="inherit" onClick={handleDrawerToggle}>
              <MuiMenuIcon />
            </MuiIconButton>
          ) : (
            <></>
          )}

          {/* Left Aligned Items */}
          {renderContentsWithAlignment('left')}

          {/* Navigation Menu Items */}
          {props.navItems.map((d) => {
            if (d.type === 'route') {
              let highlightNav = false;
              if (location.pathname.includes(d.path)) {

                if ('/' + location.pathname.split('/')[1] !== d.path) {
                  highlightNav = false;
                } else {
                  highlightNav = true;
                }
              }

              return (
                <StyledMenuItem
                  key={d.name}
                  component={Link}
                  to={d.path}
                  selected={highlightNav}
                  sx={{ display: drawerMenuIconDisplayed ? 'none' : 'inherit' }}
                  tabIndex={0}
                  aria-label={`menuitem ${d.name}-navigation`}
                >
                  <MuiTypography textAlign="center">{d.name}</MuiTypography>
                </StyledMenuItem>
              );
            } else if (d.type === 'custom') {
              return (
                <StyledMenuItem
                  key={d.name}
                  sx={{ display: drawerMenuIconDisplayed ? 'none' : 'inherit' }}
                  onClick={d.callback}
                  tabIndex={0}
                  aria-label={`menuitem ${d.name}-navigation`}
                >
                  <MuiTypography textAlign="center">{d.name}</MuiTypography>
                </StyledMenuItem>
              );
            }
          })}
        </LeftWrapper>

        <RightWrapper ref={rightWrapperRef} aria-label="menubar">
          {/* Right Aligned Items */}
          {renderContentsWithAlignment('right')}
        </RightWrapper>
      </MuiToolbar>
    </>
  );
};

NavBar.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  contents: PropTypes.array.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string,
      callback: PropTypes.func,
    }).isRequired
  ).isRequired,
  pendoMetadata: PropTypes.object.isRequired,
};

export default NavBar;
