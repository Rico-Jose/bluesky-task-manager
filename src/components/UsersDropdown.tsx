import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 340,
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
          required
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
