import api from './api';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 🔐 Interface and login function
export interface LoginPayload {
  email: string;
  password: string;
  role: 'user' | 'admin' | 'worker';
}

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

// 🎨 Utility to merge class names (used by shadcn/ui)
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
