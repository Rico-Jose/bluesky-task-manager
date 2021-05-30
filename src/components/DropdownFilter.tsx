import React, { useState } from 'react';

const DropdownFilter = (props: any) => {
  const [open, setOpen] = useState(false);

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
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Select User
      </button>
      {open && (
        <div>
          {props.users.map((user: any) => (
            <a
              className="dropdown-item"
              key={user.id}
              onClick={() => props.getUserId(user.id)}
            >
              {user.firstName}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
