import React, { useState, useEffect } from 'react';

const Dropdown = (props: any) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<any>('');

  useEffect(() => {
    //console.log(JSON.stringify(selection));
  }, [selection]);

  //props.getuserFilter(user.id);
  //   function handleOnClick(user: any) {
  //     setSelection(user);
  //   }

  const toggle = (e: boolean) => setOpen(!open);
  /* 
  const renderUserList = props.users.map((user: any) => {
    return;
    <li key={user.id}>
      <button type="button" onClick={() => handleOnClick(user)}>
        <span>{user.value}</span>
      </button>
    </li>;
  });
 */
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
      {/* {open && (
        <div>
          {props.users.map((user: any) => (
            <div key={user.id}>
              <button
                className="btn btn-secondary"
                onClick={() => props.getUserId(user.id)}
              >
                <span>{user.firstName}</span>
              </button>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Dropdown;
