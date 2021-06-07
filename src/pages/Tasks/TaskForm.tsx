import React, { useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useForm, Form } from '../../components/useForm';
import Controls from '../../components/controls/Controls';
import { Grid } from '@material-ui/core';

const initialFieldValues = {
  name: '',
  user: '',
  isComplete: false,
};

export default function TaskForm(props: any) {
  const { taskToEdit, addOrEdit, handleSetFuncName } = props;

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
  };

  useEffect(() => {
    if (taskToEdit) {
      setValues({ ...taskToEdit });
      handleSetFuncName('Update Task');
    } else {
      handleSetFuncName('Add Task');
    }
  }, [taskToEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Controls.Input
          name="name"
          label="Name"
          value={values.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <Controls.Select
          name="user"
          label="User"
          value={values.user}
          onChange={handleInputChange}
          options={users}
          error={errors.user}
        />
      </Grid>
      <Grid container>
        <Controls.Checkbox
          name="isComplete"
          label="Completed"
          value={values.isComplete}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container>
        <Controls.Button type="submit" text="Submit" fullWidth />
        <Controls.Button
          text="Reset"
          color="default"
          onClick={resetForm}
          fullWidth
        />
      </Grid>
    </Form>
  );
}
