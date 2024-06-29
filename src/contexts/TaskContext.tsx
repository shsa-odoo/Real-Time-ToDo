// src/contexts/TaskContext.tsx

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Task } from '../types/Task';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('taskCreated', (task: Task) => setTasks((prevTasks) => [...prevTasks, task]));
    newSocket.on('taskUpdated', (updatedTask: Task) => setTasks((prevTasks) =>
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    ));
    newSocket.on('taskDeleted', (taskId: string) => setTasks((prevTasks) =>
      prevTasks.filter(task => task.id !== taskId)
    ));

    return () => {
      newSocket.close();
    };
  }, []);

  const addTask = async (task: Task) => {
    const response = await axios.post('/api/tasks', task);
    setTasks((prevTasks) => [...prevTasks, response.data]);
  };

  const updateTask = async (task: Task) => {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    setTasks((prevTasks) => prevTasks.map(t => (t.id === task.id ? response.data : t)));
  };

  const deleteTask = async (taskId: string) => {
    await axios.delete(`/api/tasks/${taskId}`);
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
