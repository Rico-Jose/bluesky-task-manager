import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import { Grid } from '@material-ui/core';

const initialFieldValues = {
  id: '0',
  name: '',
  user: '',
  isComplete: false,
};

export default function TaskForm() {
  const { values, setValues, handleInputChange } = useForm(initialFieldValues);
  const users = useUser();

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="user"
            label="User"
            value={values.user}
            onChange={handleInputChange}
            options={users}
          />
          <Controls.Checkbox
            name="isComplete"
            label="Completed"
            value={values.isComplete}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
