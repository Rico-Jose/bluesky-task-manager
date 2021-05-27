import React from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';

const TaskList = (props: any) => {
  const deleteTaskHandler = (id: any) => {
    props.getTaskId(id);
  };

  const renderTaskList = props.tasks.map((task: any) => {
    return <TaskCard task={task} getTaskId={deleteTaskHandler} key={task.id} />;
  });

  return (
    <main>
      <div className="row">
        <div className="col-6">
          <h2>Task List</h2>
        </div>
        <div className="col-6">
          <Link to="/add">
            <button className="btn btn-primary">Add Task</button>
          </Link>
        </div>
      </div>
      {renderTaskList}
    </main>
  );
};

export default TaskList;
