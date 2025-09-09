import React from 'react';
import PropTypes from 'prop-types';

import MuiMenuItem from '@mui/material/MenuItem';
import MuiTypography from '@mui/material/Typography';
import MuiModal from '@mui/material/Modal';
import MuiBox from '@mui/material/Box';
import MuiFormControl from '@mui/material/FormControl';
import MuiInputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MuiInput from '@mui/material/Input';

const MenuItemModal = (props) => {
  // Handle modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form state
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <MuiMenuItem
        key={props.name}
        onClick={function () {
          // Close menu item is in
          props.handleClose();

          // Open modal
          handleOpen();
        }}
      >
        <MuiTypography textAlign="center">{props.name}</MuiTypography>
      </MuiMenuItem>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MuiBox
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          {/* <MuiTypography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </MuiTypography>
          <MuiTypography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </MuiTypography> */}
          <MuiFormControl fullWidth>
            <MuiInputLabel id="demo-simple-select-label">Type</MuiInputLabel>
            <MuiSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MuiMenuItem value={10}>Account</MuiMenuItem>
              <MuiMenuItem value={20}>Contact</MuiMenuItem>
              <MuiMenuItem value={30}>Opportunity</MuiMenuItem>
            </MuiSelect>
          </MuiFormControl>
          <MuiFormControl>
            <MuiInputLabel id="demo-simple-select-label">Field 1</MuiInputLabel>
            <MuiInput
              id="demo-simple-select-label"
              labelId="demo-simple-select-label"
            ></MuiInput>
          </MuiFormControl>
        </MuiBox>
      </MuiModal>
    </>
  );
};

MenuItemModal.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MenuItemModal;
