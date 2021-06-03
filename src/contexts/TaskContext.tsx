import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = React.createContext([]);

//  Custom hook
//  Expose this so other components can access TaskProvider
export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }: any) {
  const [tasks, setTasks] = useState([]);

  //  Retrieve todos from the server
  const retrieveTasks = async () => {
    //  GET api/todos
    const response = await axios.get('api/todos');
    return response.data.todos;
  };

  //  Run the hook on mount
  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if (allTasks) setTasks(allTasks);
    };

    getAllTasks();
  }, []);

  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
}
