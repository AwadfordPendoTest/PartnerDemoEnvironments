import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import MuiBox from '@mui/material/Box';
import MuiFormControl from '@mui/material/FormControl';
import MuiButton from '@mui/material/Button';
import MuiPortal from '@mui/material/Portal';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Select from './Select';
import TextField from './TextField';
import RadioGroup from './RadioGroup';

const supportedComponents = {
  Select: Select,
  TextField: TextField,
  RadioGroup: RadioGroup,
};

const Form = (props) => {
  // Router navigation hook for rendering new page on submit
  const navigate = useNavigate();

  // Handle snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('success');
  const [alertMessage, setAlertMessage] = React.useState(
    'Created successfully!'
  );
  const handleSnackbarOpen = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = (event) => {
    // Call optional cancel callback
    if (props.cancelCallback) {
      props.cancelCallback(event, navigate);
    }

    // Call optional modal close function
    if (props.modalClose) {
      props.modalClose();
    }
  };

  const handleSubmit = (event) => {
    // Call optional submit callback
    if (props.submitCallback) {
      props.submitCallback(event, navigate);
    }

    // follow cancel callback to close modal
    if (props.cancelCallback) {
      props.cancelCallback(event, navigate);
    }

    // Call optional modal close function
    if (props.modalClose) {
      props.modalClose();
    }

    handleSnackbarOpen('success', props.successMessage);
  };

  return (
    <>
      <MuiPortal>
        <MuiSnackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          autoHideDuration={4000}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </MuiAlert>
        </MuiSnackbar>
      </MuiPortal>
      {/* Render form components from contents */}
      {props.contents.map((d, i) => {
        let Component = supportedComponents[d.componentName];

        return (
          <MuiFormControl
            key={`${d.componentName}-${d.label}-${i}`}
            fullWidth
            sx={{ marginTop: '15px' }}
          >
            <Component {...d}></Component>
          </MuiFormControl>
        );
      })}
      {/* Render Cancel and Submit Buttons */}
      <MuiBox
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <MuiButton
          className="form-button cancel-button"
          sx={{
            borderRadius: '5px',
            padding: '6px 40px',
            color: '#7E8299',
            backgroundColor: '#f5f8fa',
            '&:hover': { backgroundColor: '#E1E3E6' },
          }}
          variant="contained"
          onClick={handleCancel}
          aria-label="Cancel"
        >
          Cancel
        </MuiButton>
        <MuiButton
          className="form-button submit-button"
          sx={{
            borderRadius: '5px',
            padding: '6px 40px',
            marginLeft: '20px',
            backgroundColor: '#1DA259',
            '&:hover': {
              backgroundColor: '#1a9150',
            },
          }}
          variant="contained"
          onClick={handleSubmit}
          aria-label="submit"
        >
          Submit
        </MuiButton>
      </MuiBox>
    </>
  );
};

Form.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      componentName: PropTypes.string.isRequired,
    })
  ).isRequired,
  cancelCallback: PropTypes.func,
  submitCallback: PropTypes.func,
  modalClose: PropTypes.func,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default Form;
