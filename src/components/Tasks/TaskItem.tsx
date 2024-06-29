// src/components/Tasks/TaskItem.tsx

import React from 'react';
import { Task } from '../../types/Task';
import { useTasks } from '../../contexts/TaskContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const handleComplete = async () => {
    await updateTask({ ...task, status: 'complete' });
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.dueDate}</p>
      <p>{task.assignee}</p>
      <p>{task.priority}</p>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
