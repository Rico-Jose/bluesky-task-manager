import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

export function useForm(initialFieldValues: any) {
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, setValues, handleInputChange };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props: any) {
  const classes = useStyles();

  return <form className={classes.root}>{props.children}</form>;
}
