import React from 'react';
import PropTypes from 'prop-types';

import MuiRadio from '@mui/material/Radio';
import MuiRadioGroup from '@mui/material/RadioGroup';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormLabel from '@mui/material/FormLabel';

const RadioGroup = (props) => {
  // Handle select state
  let defaultValue =
    typeof props.default === 'function' ? props.default() : props.default;
  const [radioValue, setRadioValue] = React.useState(defaultValue || '');

  const handleChange = (event) => {
    // Call optional change start callback
    if (props.changeStartCallback) {
      props.changeStartCallback(event);
    }

    setRadioValue(event.target.value);

    // Call optional change end callback
    if (props.changeEndCallback) {
      props.changeEndCallback(event);
    }
  };

  return (
    <>
      <MuiFormControl>
        <MuiFormLabel id={`${props.id}-label`}>{props.label}</MuiFormLabel>
        <MuiRadioGroup
          row={props.opts.row ? true : false}
          sx={{ ...props.styles }}
          {...props.opts}
          id={props.id}
          className={props.classes}
          label={props.label}
          value={radioValue}
          onChange={handleChange}
        >
          {props.options.map((d, i) => (
            <MuiFormControlLabel
              key={`${props.id}-${d.name}`}
              value={d.value}
              label={d.value}
              control={<MuiRadio />}
            ></MuiFormControlLabel>
          ))}
        </MuiRadioGroup>
      </MuiFormControl>
    </>
  );
};

RadioGroup.propTypes = {
  styles: PropTypes.object,
  opts: PropTypes.object,
  id: PropTypes.string,
  classes: PropTypes.string,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  default: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  changeStartCallback: PropTypes.func,
  changeEndCallback: PropTypes.func,
};

export default RadioGroup;
