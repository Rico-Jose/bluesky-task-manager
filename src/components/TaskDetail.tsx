import React from 'react';

const TaskDetail = (props: any) => {
  const { name, user, isComplete } = props.location.state.task;

  return (
    <main>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{name}</h1>
          <p className="card-text">{user}</p>
          {isComplete && <p className="card-text">Completed</p>}
          {!isComplete && <p className="card-text">Not Completed</p>}
        </div>
      </div>
      <div>
        <button className="btn btn-primary">Back to Task List</button>
      </div>
    </main>
  );
};

export default TaskDetail;
