import React from 'react';

const TaskList = (props: any) => {
  const renderTaskList = props.tasks.map((task: any) => {
    return <p>{task.name}</p>;
  });

  return (
    <main>
      <h2>Task List</h2>
      {renderTaskList}
    </main>
  );
};

export default TaskList;
