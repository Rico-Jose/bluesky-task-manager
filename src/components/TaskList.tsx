import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import DropdownFilter from './DropdownFilter';
import TaskTable from './TaskTable';
import Button from '@material-ui/core/Button';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { green } from '@material-ui/core/colors';

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
          <div className="input-group rounded">
            <input
              ref={inputElement}
              type="search"
              className="form-control rounded"
              placeholder="Enter Name"
              aria-label="Search"
              aria-describedby="search-addon"
              value={props.term}
              onChange={getSearchTerm}
              style={{ margin: '10px' }}
            />
          </div>
        </div>
        <div className="col-3">
          <DropdownFilter users={props.users} getUserId={userFilterHandler} />
        </div>
        <div className="col-3">
          <div>
            <button
              className="btn"
              value={isComplete}
              onClick={() => toggle(!isComplete)}
              style={{ margin: '5px 10px' }}
            >
              {isComplete ? (
                <ToggleOffIcon fontSize="large" color="disabled" />
              ) : (
                <ToggleOnIcon fontSize="large" style={{ color: green[500] }} />
              )}
            </button>
            <label className="form-check-label">Completed</label>
          </div>
        </div>
      </div>
      <br />
      <div>
        <TaskTable
          tasks={props.tasks}
          users={props.users}
          getTaskId={deleteTaskHandler}
        />
        <br />
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add Task
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default TaskList;
