import { create } from 'zustand';

export type TaskType = 'receive' | 'putaway' | 'pick' | 'move' | 'dispatch';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  items: {
    sku: string;
    name: string;
    quantity: number;
    location?: {
      from?: string;
      to?: string;
    };
  }[];
  instructions?: string;
  estimatedTime?: number; // in minutes
}

interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setSelectedTask: (task: Task | null) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByUser: (userId: string) => Task[];
}

// Mock data
const mockTasks: Task[] = [
  {
    id: '1',
    type: 'receive',
    title: 'Receive Dell Laptops',
    description: 'Process incoming shipment of Dell XPS 13 laptops',
    priority: 'high',
    status: 'pending',
    assignedTo: '3',
    createdAt: new Date('2024-01-16T09:00:00'),
    dueDate: new Date('2024-01-16T17:00:00'),
    items: [
      { sku: 'SKU-001', name: 'Laptop Dell XPS 13', quantity: 10 }
    ],
    instructions: 'Check serial numbers and verify condition',
    estimatedTime: 45,
  },
  {
    id: '2',
    type: 'pick',
    title: 'Pick Items for Order #12345',
    description: 'Collect items for customer order',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: '3',
    createdAt: new Date('2024-01-16T10:30:00'),
    dueDate: new Date('2024-01-16T14:00:00'),
    items: [
      { sku: 'SKU-002', name: 'Wireless Mouse', quantity: 2, location: { from: 'B2-1-05' } },
      { sku: 'SKU-004', name: 'Monitor 27" 4K', quantity: 1, location: { from: 'A2-3-02' } }
    ],
    instructions: 'Pack items carefully and verify quantities',
    estimatedTime: 30,
  },
  {
    id: '3',
    type: 'putaway',
    title: 'Store New Monitors',
    description: 'Place new monitors in designated locations',
    priority: 'low',
    status: 'completed',
    assignedTo: '3',
    createdAt: new Date('2024-01-15T14:00:00'),
    completedAt: new Date('2024-01-15T15:30:00'),
    items: [
      { sku: 'SKU-004', name: 'Monitor 27" 4K', quantity: 5, location: { to: 'A2-3-02' } }
    ],
    estimatedTime: 60,
  },
];

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: mockTasks,
  selectedTask: null,
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ loading: false });
  },

  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    set(state => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (id, updatedTask) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    }));
  },

  completeTask: (id) => {
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id
          ? { ...task, status: 'completed' as TaskStatus, completedAt: new Date() }
          : task
      )
    }));
  },

  deleteTask: (id) => {
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== id)
    }));
  },

  setSelectedTask: (task) => set({ selectedTask: task }),

  getTasksByStatus: (status) => {
    const { tasks } = get();
    return tasks.filter(task => task.status === status);
  },

  getTasksByUser: (userId) => {
    const { tasks } = get();
    return tasks.filter(task => task.assignedTo === userId);
  },
}));