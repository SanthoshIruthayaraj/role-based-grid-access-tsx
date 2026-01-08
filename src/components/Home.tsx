import { useMemo, useState, type JSX } from 'react';
import type { ColumnModel } from '@syncfusion/ej2-grids';
import { ROLE_CONFIG, columns as baseColumns } from '../common/grid-config';
import { generateEmployees } from '../data/data-source';
import type { Employee, UserAccount } from '../types/app-types';
import Login from './Login';
import EmployeeGrid from './EmployeeGrid';
import Navbar from './Navbar';
import '../styles/Home.css';

const APPLICATION_TITLE = 'SummitBridge Workforce Portal';

export default function Home(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  const columns = useMemo<ColumnModel[]>(
    () => baseColumns.filter((c) => c.field !== 'notes'),
    []
  );

  const employeeData = useMemo<Employee[]>(() => generateEmployees(100), []);

  const handleLogin = (account: UserAccount): void => {
    setCurrentUser(account);
  };

  const handleLogout = (): void => {
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar user={currentUser} title={APPLICATION_TITLE} onLogout={handleLogout} />
          <main className="content-wrapper">
            <EmployeeGrid
              data={employeeData}
              currentRole={currentUser.role}
              roleConfig={ROLE_CONFIG}
              columns={columns}
            />
          </main>
        </>
      )}
    </div>
  );
}