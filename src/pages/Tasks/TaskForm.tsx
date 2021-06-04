import React from 'react';
import { useForm, Form } from '../../components/useForm';
import Input from '../../components/controls/Input';
import { Grid } from '@material-ui/core';

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
          <Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
