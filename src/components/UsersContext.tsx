import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UsersContext = React.createContext([]);

export function useData() {
  return useContext(UsersContext);
}

export function UsersProvider({ children }: any) {
  const [users, setUsers] = useState([]);

  //  Retrieve users from the server
  const retrieveUsers = async () => {
    //  GET api/users
    const response = await axios.get('api/users');
    return response.data.users;
  };

  //  Run the hook on mount
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllUsers();
  }, []);

  return (
    <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
  );
}
