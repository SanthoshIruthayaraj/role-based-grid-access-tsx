import type { ColumnModel } from '@syncfusion/ej2-grids';
import type { RoleConfigMap, RoleKey, DemoAccount } from '../types/app-types';

export const roles: RoleKey[] = ['Admin', 'Manager', 'Employee'];

export const ROLE_CONFIG: RoleConfigMap = {
  Admin: {
    canEdit: true,
    canAdd: true,
    canDelete: true,
    visible: [
      'id',
      'fullName',
      'email',
      'department',
      'role',
      'title',
      'salary',
      'active',
      'joinDate',
      'contact',
    ],
  },
  Manager: {
    canEdit: true,
    canAdd: false,
    canDelete: false,
    visible: [
      'id',
      'fullName',
      'email',
      'department',
      'role',
      'title',
      'active',
      'joinDate',
      'rating',
      'contact',
    ],
  },
  Employee: {
    canEdit: false,
    canAdd: false,
    canDelete: false,
    visible: [
      'fullName',
      'email',
      'department',
      'title',
      'active',
      'joinDate',
      'contact',
    ],
  },
};

export const columns: ColumnModel[] = [
  { field: 'id', headerText: 'ID', isPrimaryKey: true, width: 100, textAlign: 'Right', allowEditing: false },
  { field: 'fullName', headerText: 'Name', type: 'string', width: 160, allowEditing: false },
  { field: 'email', headerText: 'Email', width: 240, allowEditing: false },
  { field: 'joinDate', headerText: 'Join Date', type: 'date', editType: 'datepickeredit', format: 'yMd', width: 130, allowEditing: false },
  { field: 'department', headerText: 'Department', width: 140 },
  { field: 'role', headerText: 'Role', width: 120, editType: 'dropdownedit' },
  { field: 'title', headerText: 'Title', width: 140 },
  { field: 'salary', headerText: 'Salary', type: 'number', editType: 'numericedit', format: 'C0', textAlign: 'Right', width: 120 },
  { field: 'active', headerText: 'Active', type: 'boolean', editType: 'booleanedit', width: 100, textAlign: 'Center' },
  { field: 'rating', headerText: 'Rating', type: 'number', width: 120, editType: 'numericedit' },
  { field: 'contact', headerText: 'Contact', width: 170 },
];

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: 'Admin', userId: 'lucas', password: 'sunset42' },
  { role: 'Manager', userId: 'mia', password: 'harbor78' },
  { role: 'Employee', userId: 'oliver', password: 'meadow25' },
];