import React from 'react';
import PropTypes from 'prop-types';

import MuiIconButton from '@mui/material/IconButton';
import MuiBox from '@mui/material/Box';
import MuiAvatar from '@mui/material/Avatar';
import MuiPersonIcon from '@mui/icons-material/Person';
import Popover from '@mui/material/Popover';

const NavAvatar = (props) => {
  // Handle popover open state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <MuiIconButton
        sx={{ ...props.styles }}
        {...props.opts}
        id={props.id}
        className={props.classes}
        onClick={handleClick}
        aria-label="profile"
      >
        {props.label ? (
          <MuiBox
            style={{
              fontSize: '14px',
              color: 'white',
              fontWeight: '600',
              textTransform: 'uppercase',
              marginRight: '10px',
            }}
          >
            {props.label}
          </MuiBox>
        ) : (
          ''
        )}
        <MuiAvatar>
          <MuiPersonIcon></MuiPersonIcon>
        </MuiAvatar>
      </MuiIconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <table style={{ padding: '10px' }} className="user-info-table">
          <tbody>
            <tr>
              <td>Visitor:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.id?.includes('@')
                  ? props?.pendoMetadata?.visitor?.id?.slice(
                      0,
                      props?.pendoMetadata?.visitor?.id?.indexOf('@')
                    )
                  : props?.pendoMetadata?.visitor?.id}
              </td>
            </tr>
            <tr>
              <td>Account:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.account?.id}
              </td>
            </tr>
            <tr>
              <td>Role:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.role}
              </td>
            </tr>
            <tr>
              <td>Team:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.team}
              </td>
            </tr>
            <tr>
              <td>Title:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.title}
              </td>
            </tr>
            <tr>
              <td>Region:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.region}
              </td>
            </tr>
            <tr>
              <td>Office:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.office}
              </td>
            </tr>
            <tr>
              <td>System:</td>
              <td style={{ width: '10px' }}></td>
              <td style={{ textAlign: 'right' }}>
                {props?.pendoMetadata?.visitor?.system}
              </td>
            </tr>
          </tbody>
        </table>
      </Popover>
    </>
  );
};

NavAvatar.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  label: PropTypes.string,
  pendoMetadata: PropTypes.object.isRequired,
};

export default NavAvatar;
