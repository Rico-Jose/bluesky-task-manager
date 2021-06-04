import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';

export default function Checkbox(props: any) {
  const { name, label, value, onChange } = props;
  const convertToDefEventParam = (name: any, value: any) => ({
    target: { name, value },
  });

  return (
    <FormControl>
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventParam(name, e.target.checked))
            }
          />
        }
      />
    </FormControl>
  );
}
