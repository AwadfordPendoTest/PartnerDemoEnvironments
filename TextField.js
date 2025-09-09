import React from 'react';
import PropTypes from 'prop-types';

import MuiTextField from '@mui/material/TextField';

const TextField = (props) => {
  return (
    <>
      <MuiTextField
        variant="outlined"
        sx={{ ...props.styles }}
        error={props.opts.error ? true : false}
        {...props.opts}
        id={props.id}
        className={props.classes}
        label={props.label}
        name={props.label}
      ></MuiTextField>
    </>
  );
};

TextField.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default TextField;
