import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function UsersDropdown(props: any) {
  const classes = useStyles();
  const [user, setUser] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setUser(event.target.value as string);
    props.getUserId(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          onChange={handleChange}
        >
          {props.users.map((user: any) => (
            <MenuItem value={user.id} key={user.id}>
              {user.firstName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

/* import React, { useState } from 'react';

const UsersDropdown = (props: any) => {
  const [open, setOpen] = useState(false);

  const toggle = (e: boolean) => setOpen(!open);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Select User
      </button>
      {open && (
        <div>
          {props.users.map((user: any) => (
            <a
              className="dropdown-item"
              key={user.id}
              onClick={() => {
                toggle(!open);
                props.getUserId(user.id);
              }}
            >
              {user.firstName}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersDropdown;
 */
