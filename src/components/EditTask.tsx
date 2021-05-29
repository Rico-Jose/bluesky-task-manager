import React, { useState } from 'react';

const EditTask = (props: any) => {
  const [name, setName] = useState(props.location.state.task.name);
  const [user, setUser] = useState(props.location.state.task.user);
  const [isComplete, setIsComplete] = useState(
    props.location.state.task.isComplete
  );

  const update = (e: any) => {
    // Don't refresh page
    e.preventDefault();

    if (!name || !user) {
      alert('Name and User are required');
      return;
    }

    const task = {
      id: props.location.state.task.id,
      name: name,
      user: user,
      isComplete: isComplete,
    };

    // Pass data to parent component
    props.editTaskHandler(task);

    // Reset values
    setName('');
    setUser('');
    setIsComplete(false);

    // Go to back the home page
    props.history.push('/');
  };

  return (
    <>
      <h2 className="m-3">Edit Task</h2>
      <form onSubmit={update}>
        <div className="form-group m-3">
          <label className="mb-3">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group m-3">
          <label className="mb-3">User</label>
          <input
            type="text"
            className="form-control"
            name="user"
            value={user}
            placeholder="User"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group form-check m-3 pt-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.currentTarget.checked)}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Update
        </button>
      </form>
    </>
  );
};

export default EditTask;
