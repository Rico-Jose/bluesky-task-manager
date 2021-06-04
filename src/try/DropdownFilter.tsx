import React from 'react';
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: 4,
      position: 'relative',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

export default function DropdownFilter(props: any) {
  const classes = useStyles();
  const [user, setUser] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser(event.target.value as string);
    props.getUserId(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.margin} style={{ marginLeft: '80px' }}>
        <InputLabel style={{ margin: '-10px 15px' }}>Filter by User</InputLabel>
        <NativeSelect
          value={user}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          {props.users.map((user: any) => (
            <option value={user.id} key={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
