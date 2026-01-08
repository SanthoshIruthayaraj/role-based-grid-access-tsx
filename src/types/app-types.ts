import type { ColumnModel } from '@syncfusion/ej2-grids';

export type RoleKey = 'Admin' | 'Manager' | 'Employee';

export interface UserAccount {
  role: RoleKey;
  userId: string;
}

export interface DemoAccount extends UserAccount {
  password: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface RolePermissions {
  canEdit: boolean;
  canAdd: boolean;
  canDelete: boolean;
  visible: string[];
}

export type RoleConfigMap = Record<RoleKey, RolePermissions>;

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  department: string;
  role: RoleKey;
  title: string;
  salary: number;
  active: boolean;
  joinDate: Date;
  rating: number;
  contact: string;
}

export interface LoginProps {
  onLogin: (account: UserAccount) => void;
}

export interface NavbarProps {
  user: UserAccount;
  title: string;
  onLogout: () => void;
}

export interface EmployeeGridProps {
  data: Employee[];
  currentRole: RoleKey;
  roleConfig: RoleConfigMap;
  columns: ColumnModel[];
}

export interface ContactEditTemplateProps extends Partial<Employee> {
  rowData?: Employee;
}