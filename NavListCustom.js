import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DynamicIcon from '../../common/DynamicIcon';

const NavListCustom = (props) => {
  return (
    <>
      <ListItem disablePadding button component={Link}>
        <ListItemButton sx={{ padding: '5px 40px' }} onClick={props.callback}>
          {props.icon ? (
            <ListItemIcon>
              <DynamicIcon icon={props.icon}></DynamicIcon>
            </ListItemIcon>
          ) : (
            ''
          )}
          <ListItemText primary={props.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
};

NavListCustom.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default NavListCustom;
