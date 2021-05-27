import React, { useState } from 'react';

const AddTask = (props: any) => {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const add = (e: any) => {
    // Don't refresh page
    e.preventDefault();

    if (!name || !user) {
      alert('All fields are required');
      return;
    }

    const task = {
      name: name,
      user: user,
      isComplete: isComplete,
    };

    // Pass data to parent component
    props.addTaskHandler(task);

    // Reset values
    setName('');
    setUser('');
    setIsComplete(false);
  };

  return (
    <>
      <h2 className="m-3">Add Task</h2>
      <form onSubmit={add}>
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
          Add
        </button>
      </form>
    </>
  );
};

export default AddTask;
