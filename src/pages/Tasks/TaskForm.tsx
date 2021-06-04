import React from 'react';
import { useForm, Form } from '../../components/useForm';
import { Grid, TextField, makeStyles } from '@material-ui/core';

const initialFieldValues = {
  id: '0',
  name: '',
  user: '',
  isComplete: false,
};

export default function TaskForm() {
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
