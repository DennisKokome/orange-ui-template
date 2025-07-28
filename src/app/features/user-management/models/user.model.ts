export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
}

export type UserStatus = 'active' | 'inactive';
export type UserRole = 'Admin' | 'User' | 'Manager' | 'Editor';

export interface UserFilter {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: UserStatus;
}
