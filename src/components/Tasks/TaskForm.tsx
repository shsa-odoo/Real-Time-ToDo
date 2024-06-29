// src/components/Tasks/TaskForm.tsx

import React, { useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { Task } from '../../types/Task';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('low');
  const { addTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: '',
      title,
      description,
      dueDate,
      assignee,
      priority,
      status: 'incomplete'
    };
    await addTask(newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div>
        <label>Assignee</label>
        <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
      </div>
      <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
