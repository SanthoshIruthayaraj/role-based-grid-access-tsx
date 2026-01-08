import type { Employee, RoleKey } from '../types/app-types';
import { roles } from '../common/grid-config';

const salaryRanges: Record<RoleKey, [number, number]> = {
  Admin: [130000, 140000],
  Manager: [100000, 110000],
  Employee: [70000, 80000],
};

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pickOne = <T,>(array: T[]): T => array[randomInt(0, array.length - 1)];

const randomDate = (startYear = 2009, endYear = 2014): Date => {
  const startMs = new Date(`${startYear}-01-01`).getTime();
  const endMs = new Date(`${endYear}-12-31`).getTime();
  return new Date(randomInt(startMs, endMs));
};

const buildEmployeeId = (index: number, prefix = 'EMP', width = 4): string =>
  `${prefix}-${String(index).padStart(width, '0')}`;

const buildContactNumber = (): string => {
  const exchange = randomInt(100, 999);
  const line = randomInt(1000, 9999);
  return `(555) ${exchange}-${line}`;
};

export function generateEmployees(totalEmployees = 36): Employee[] {
  const firstNames = ['Ava','Liam','Noah','Emma','Oliver','Sophia','Elijah','Isabella','James','Mia'];
  const lastNames = ['Johnson','Smith','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez'];
  const jobTitles = [
    'Software Engineer',
    'Senior Software Engineer',
    'Account Manager',
    'Business Analyst',
    'Human Resources Executive',
    'Quality Assurance Specialist',
    'Technical Support Specialist',
  ];
  const departments = ['Engineering', 'Sales', 'Marketing', 'Finance', 'Human Resources'];

  const employees: Employee[] = [];

  for (let employeeIndex = 1; employeeIndex <= totalEmployees; employeeIndex += 1) {
    const firstName = pickOne(firstNames);
    const lastName = pickOne(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const departmentName = pickOne(departments);
    const role = pickOne(roles);
    const [minSalary, maxSalary] = salaryRanges[role];

    employees.push({
      id: buildEmployeeId(employeeIndex),
      fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${employeeIndex}@example.org`,
      department: departmentName,
      role,
      title: pickOne(jobTitles),
      salary: randomInt(minSalary, maxSalary),
      active: Math.random() > 0.2,
      joinDate: randomDate(2009, 2014),
      rating: randomInt(1, 5),
      contact: buildContactNumber(),
    });
  }

  return employees;
}