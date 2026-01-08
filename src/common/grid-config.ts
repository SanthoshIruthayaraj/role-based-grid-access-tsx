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
  { field: 'id', headerText: 'ID', isPrimaryKey: true, width: 100, textAlign: 'Right', allowEditing: false, visible: false },
  { field: 'fullName', headerText: 'Name', type: 'string', width: 180, allowEditing: false },
  { field: 'title', headerText: 'Title', width: 160 },
  { field: 'department', headerText: 'Department', width: 160 },
  { field: 'role', headerText: 'Role', width: 140, editType: 'dropdownedit' },
  { field: 'email', headerText: 'Email', width: 260, allowEditing: false },
  { field: 'contact', headerText: 'Contact', width: 180, textAlign: 'Center' },
  { field: 'joinDate', headerText: 'Join Date', type: 'date', editType: 'datepickeredit', format: 'yMd', textAlign: 'Right', width: 140, allowEditing: false },
  { field: 'active', headerText: 'Active', type: 'boolean', editType: 'booleanedit', width: 110, textAlign: 'Center' },
  { field: 'rating', headerText: 'Rating', type: 'number', width: 120, editType: 'numericedit' },
  { field: 'salary', headerText: 'Salary', type: 'number', editType: 'numericedit', format: 'C0', textAlign: 'Right', width: 130 },
];


export const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: 'Admin', userId: 'lucas', password: 'sunset42' },
  { role: 'Manager', userId: 'mia', password: 'harbor78' },
  { role: 'Employee', userId: 'oliver', password: 'meadow25' },
];