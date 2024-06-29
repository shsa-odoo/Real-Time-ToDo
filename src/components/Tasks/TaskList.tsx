// src/components/Tasks/TaskList.tsx

import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
