import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { useAddTask } from '../../contexts/TaskContext';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import { Grid } from '@material-ui/core';

const initialFieldValues = {
  /* id: '', */
  name: '',
  user: '',
  isComplete: false,
};

export default function TaskForm() {
  const validate = () => {
    let temp: any = {};
    temp.name = values.name ? '' : 'This field is required.';
    temp.user = values.user ? '' : 'This field is required.';
    setErrors({ ...temp });

    // Array.proptotype.every()
    return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues);
  const users = useUser();
  const addTask = useAddTask();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      addTask(values);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="user"
            label="User"
            value={values.user}
            onChange={handleInputChange}
            options={users}
            error={errors.user}
          />
          <Controls.Checkbox
            name="isComplete"
            label="Completed"
            value={values.isComplete}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
