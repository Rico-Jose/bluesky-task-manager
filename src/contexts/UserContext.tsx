import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = React.createContext([]);

// Custom hook
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: any) {
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

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
}
