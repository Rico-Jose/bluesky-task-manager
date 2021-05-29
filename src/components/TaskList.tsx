import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import Dropdown from './Dropdown';
import TaskTable from './TaskTable';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

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
      <TaskTable tasks={props.tasks} getTaskId={deleteTaskHandler} />
      <Link to="/add" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Add Task
        </Button>
      </Link>
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
        <div className="col-6">
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
          </div>
        </div>
        <div className="col-3">
          <Dropdown users={props.users} getUserId={userFilterHandler} />
        </div>
        <div className="col-3">
          <button
            className="btn btn-primary"
            value={isComplete}
            onClick={() => toggle(!isComplete)}
          >
            {isComplete ? <FaToggleOff /> : <FaToggleOn />}
          </button>
          <label className="form-check-label">Completed</label>
        </div>
      </div>
      <div>
        {renderTaskList.length > 0 ? renderTaskList : 'No Tasks Available'}
      </div>
    </main>
  );
};

export default TaskList;
