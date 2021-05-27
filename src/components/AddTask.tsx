import React, { useState } from 'react';

const AddTask = () => {
  return (
    <>
      <h2 className="m-3">Add Task</h2>
      <form>
        <div className="form-group m-3">
          <label className="mb-3">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="form-group m-3">
          <label className="mb-3">User</label>
          <input
            type="text"
            className="form-control"
            name="user"
            placeholder="User"
          />
        </div>
        <div className="form-group form-check m-3 pt-3">
          <input type="checkbox" className="form-check-input" />
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
