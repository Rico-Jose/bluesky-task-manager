import React from 'react';
import TaskCard from './TaskCard';

const TaskList = (props: any) => {
  const renderTaskList = props.tasks.map((task: any) => {
    return <TaskCard task={task} key={task.id} />;
  });

  return (
    <main>
      <h2>Task List</h2>
      {renderTaskList}
    </main>
  );
};

export default TaskList;
