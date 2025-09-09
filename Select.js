import React from 'react';
import PropTypes from 'prop-types';

import MuiInputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MuiMenuItem from '@mui/material/MenuItem';

const Select = (props) => {
  // Handle select state
  let defaultValue =
    typeof props.default === 'function' ? props.default() : props.default;
  const [selectValue, setSelectValue] = React.useState(defaultValue || '');

  const handleChange = (event) => {
    // Call optional change start callback
    if (props.changeStartCallback) {
      props.changeStartCallback(event);
    }

    setSelectValue(event.target.value);

    // Call optional change end callback
    if (props.changeEndCallback) {
      props.changeEndCallback(event);
    }
  };

  return (
    <>
      <MuiInputLabel id={`${props.id}-label`}>{props.label}</MuiInputLabel>
      <MuiSelect
        sx={{ ...props.styles }}
        {...props.opts}
        id={props.id}
        className={props.classes}
        label={props.label}
        value={selectValue}
        onChange={handleChange}
      >
        {props.options.map((d, i) => (
          <MuiMenuItem key={`${props.id}-${d.name}`} value={d.value}>
            {d.name}
          </MuiMenuItem>
        ))}
      </MuiSelect>
    </>
  );
};

Select.propTypes = {
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

export default Select;
