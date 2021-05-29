import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import Dropdown from './Dropdown';
/* import { FaTimes } from 'react-icons/fa'; */

const TaskList = (props: any) => {
  //console.log(props.isCompleteFilter);
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

  const getIsComplete = (e: any) => {
    setIsComplete(e);
    props.getFilter(e);
  };

  const toggle = (e: any) => {
    setIsComplete(e);
    props.getFilter(e);
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
          className="btn btn-secondary"
          value={isComplete}
          onClick={() => toggle(!isComplete)}
          /* onKeyPress={(e) => toggle(!e.currentTarget.value)} */
        >
          {isComplete ? 'On' : 'Off'}
        </button>
        <label className="form-check-label">Completed</label>
      </div>
      <Dropdown />
      {renderTaskList.length > 0 ? renderTaskList : 'No Tasks Available'}
    </main>
  );
};

export default TaskList;
