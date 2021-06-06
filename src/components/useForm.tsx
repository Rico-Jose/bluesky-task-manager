import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialFieldValues: any) {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

  return { values, setValues, errors, setErrors, handleInputChange, resetForm };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    margin: 20,
    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(2),
    },
  },
}));

export function Form(props: any) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
