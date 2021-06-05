import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = React.createContext([]);
const AddTaskContext = React.createContext((task: any) => {});
const EditTaskContext = React.createContext((task: any) => {});

//  Custom hook
//  Expose this for other components to use
export function useTask() {
  return useContext(TaskContext);
}

export function useAddTask() {
  return useContext(AddTaskContext);
}

export function useEditTask() {
  return useContext(EditTaskContext);
}

export function TaskProvider({ children }: any) {
  const [tasks, setTasks] = useState<any>([]);

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

  //  Add task
  const addTask = async (task: any) => {
    console.log(task);
    //  POST api/todo/create
    const response = await axios.post('api/todo/create', { task });
    //  Add new task to the UI
    setTasks([
      ...tasks,
      { id: response.data.todo.id, ...response.data.todo.task },
    ]);
  };

  //  Edit task
  const editTask = (task: any) => {
    //  Edit task in UI
    setTasks(
      tasks.map((t: any) => {
        return t.id === task.id ? { ...task } : t;
      })
    );
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={tasks}>
      <AddTaskContext.Provider value={addTask}>
        <EditTaskContext.Provider value={editTask}>
          {children}
        </EditTaskContext.Provider>
      </AddTaskContext.Provider>
    </TaskContext.Provider>
  );
}
