import React from 'react';
import PropTypes from 'prop-types';

import MuiInputBase from '@mui/material/InputBase';
import MuiIconButton from '@mui/material/IconButton';
import MuiSearchIcon from '@mui/icons-material/Search';
import MuiBox from '@mui/material/Box';
import { styled as muiStyled, alpha as muiAlpha } from '@mui/material/styles';

const NavSearch = (props) => {
  // Search bar contents
  const widthValue = props.buttonTextStyle
    ? 'calc(100% - 120px)'
    : 'calc(100% - 40px)';

  const SearchBar = muiStyled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: muiAlpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: muiAlpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
  }));

  const StyledInputBase = muiStyled(MuiInputBase)(({ theme }) => ({
    color: 'inherit',
    padding: theme.spacing(0, 1, 0, 1),
    width: widthValue,
  }));

  return (
    <SearchBar
      sx={{ ...props.styles }}
      {...props.opts}
      id={props.id}
      className={props.classes}
    >
      <StyledInputBase
        id="search-noodle"
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <MuiIconButton
        color="inherit"
        style={{ borderRadius: '5px' }}
        aria-label="search"
      >
        <MuiSearchIcon />
        {props.buttonTextStyle ? (
          <MuiBox style={props.buttonTextStyle}>Search</MuiBox>
        ) : (
          ''
        )}
      </MuiIconButton>
    </SearchBar>
  );
};

NavSearch.propTypes = {
  styles: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
};

export default NavSearch;
