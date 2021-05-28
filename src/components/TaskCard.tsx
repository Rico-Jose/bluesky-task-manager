import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaEdit } from 'react-icons/fa';

const TaskCard = (props: any) => {
  // Restructure
  const { id, name, user, isComplete } = props.task;

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-11">
            <Link to={{ pathname: `/task/${id}`, state: { task: props.task } }}>
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{user}</p>
            </Link>
            {isComplete && <p className="card-text">Completed</p>}
            {!isComplete && <p className="card-text">Not Completed</p>}
          </div>
          <div className="col-1">
            <Link to={{ pathname: `/edit`, state: { task: props.task } }}>
              <FaEdit />
            </Link>
            <FaTimes
              style={{ color: 'red' }}
              onClick={() => props.getTaskId(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
