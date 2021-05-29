import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import Dropdown from './Dropdown';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

const TaskList = (props: any) => {
  const inputElement = useRef<any>('');
  const [isComplete, setIsComplete] = useState(props.isCompleteFilter);

  const deleteTaskHandler = (id: any) => {
    props.getTaskId(id);
  };

  const renderTaskList = props.tasks.map((task: any) => {
    return <TaskCard task={task} getTaskId={deleteTaskHandler} key={task.id} />;
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputElement.current.value);
  };

  const toggle = (e: any) => {
    setIsComplete(e);
    props.getFilter(e);
  };

  const userFilterHandler = (id: any) => {
    props.getUserFilter(id);
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
          {/* <span className="input-group-text border-0" id="search-addon">
            <FaTimes />
          </span> */}
        </div>
      </div>
      <div className="form-group form-check m-3 pt-3">
        {/* <input
          type="checkbox"
          className="form-check-input"
          checked={isComplete}
          onChange={(e) => getIsComplete(e.currentTarget.checked)}
        /> */}
        <button
          className="btn btn-primary"
          value={isComplete}
          onClick={() => toggle(!isComplete)}
        >
          {isComplete ? <FaToggleOff /> : <FaToggleOn />}
        </button>
        <label className="form-check-label">Completed</label>
      </div>
      <Dropdown users={props.users} getUserId={userFilterHandler} />
      {renderTaskList.length > 0 ? renderTaskList : 'No Tasks Available'}
    </main>
  );
};

export default TaskList;
