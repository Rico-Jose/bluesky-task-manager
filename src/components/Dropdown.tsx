import React, { useState } from 'react';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);

  function handleOnClick(item: any) {}

  const toggle = (e: boolean) => setOpen(!open);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        Select User
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">
          Action
        </a>
        <a className="dropdown-item" href="#">
          Another action
        </a>
      </div>
    </div>
  );
};

export default Dropdown;
