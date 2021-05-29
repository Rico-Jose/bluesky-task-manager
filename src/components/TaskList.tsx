import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import { FaTimes } from 'react-icons/fa';

const TaskList = (props: any) => {
  const inputElement = useRef<any>('');
  const deleteTaskHandler = (id: any) => {
    props.getTaskId(id);
  };

  const renderTaskList = props.tasks.map((task: any) => {
    return <TaskCard task={task} getTaskId={deleteTaskHandler} key={task.id} />;
  });

  const getSearchTerm = () => {
    console.log(inputElement.current.value);
  };

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
      <div className="row">
        <div className="input-group rounded">
          <input
            ref={inputElement}
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={props.term}
            onChange={getSearchTerm}
          />
          <span className="input-group-text border-0" id="search-addon">
            <FaTimes />
          </span>
        </div>
      </div>
      {renderTaskList}
    </main>
  );
};

export default TaskList;
