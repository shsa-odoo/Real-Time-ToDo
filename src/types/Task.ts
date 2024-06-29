// src/types/Task.ts

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignee: string;
    priority: string;
    status: 'incomplete' | 'complete';
  }
  