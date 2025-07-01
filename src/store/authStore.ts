import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'manager' | 'worker';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', email: 'admin@logitrack.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'manager@logitrack.com', name: 'Manager User', role: 'manager' },
  { id: '3', email: 'worker@logitrack.com', name: 'Worker User', role: 'worker' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would be an API call
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (updatedUser: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updatedUser } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);