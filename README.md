# Role Based Employee Management Console

This React application demonstrates Role Based Access Control (RBAC) for viewing and managing employee data. After login, users see an interface that adapts to their role, controlling both which columns are visible and which actions (Add, Edit, Delete) are allowed in the Syncfusion React Grid.

Use any of the predefined accounts (listed below and sourced from `src\common\grid-config.ts`) to explore the role-specific experience: 
| Role     | User ID  | Password     | Notes                              |
|----------|----------|--------------|------------------------------------|
| Admin    | `lucas`  | `sunset42`   | Full CRUD plus all grid columns.   |
| Manager  | `mia`| `harbor78` | Edit-only access with key columns. |
| Employee | `oliver`| `meadow25`| Read-only view of essential fields.|

## Key Capabilities

- Role based login
- Dynamic column visibility and CRUD permissions
- Templates to visually represent some columns

## Project Structure
```md
src
├── main.tsx
│
├── common
│   └── grid-config.ts    # RBAC and grid column configuration
│
├── components
│   ├── EmployeeGrid.tsx  # Syncfusion Grid wired to role config
│   ├── Home.tsx          # App shell, login flow, data bootstrapping
│   ├── Login.tsx         # Credential form and validation
│   └── Navbar.tsx        # Profile menu with logout
│
├── data
│   └── data-source.ts    # Mock employee generator
│
└── styles
    ├── EmployeeGrid.css  # Styles for the employee grid component
    ├── Home.css          # Styles for the home page layout
    ├── Login.css         # Styles for the login form and page
    └── Navbar.css        # Styles for the navigation bar
```

## Roles and Access

- **Admin**
  - Columns: ID, Name, Email, Department, Role, Title, Salary, Active, Join Date, Contact
  - Permissions: Add, Edit, Delete
- **Manager**
  - Columns: ID, Name, Email, Department, Role, Title, Active, Join Date, Rating, Contact
  - Permissions: Edit
- **Employee**
  - Columns: Name, Email, Department, Title, Active, Join Date, Contact
  - Permissions: Read-only

## Grid Configuration (`src\common\grid-config.ts`)

This file centralizes every grid-specific rule:

- `roles`: the master list of supported application roles.
- `ROLE_CONFIG`: per-role capabilities, combining CRUD permissions (`canAdd`, `canEdit`, `canDelete`) with the `visible` column list that the grid enforces on login. `EmployeeGrid.tsx` reads these settings to compute toolbar options, edit behavior, and column visibility.
- `columns`: the schema shared by all roles. Each column object defines field name, header text, editor type, formatting, alignment, primary key status, and whether editing is allowed.
- `DEMO_ACCOUNTS`: the predefined login users (mirroring the credential list above) used by `Login.tsx` to validate the credential form.

## Setup & Run
Follow these steps to set up and run the application:
- Install dependencies
  ```bash
    npm install
  ```
- Start the development server
  ```bash
    npm start
  ```
- View in Browser
  ```bash
    http://localhost:3000/
  ```
  
## User Experience Flow

Users choose a role on the login screen; the app auto-populates credentials for convenience as it is a demo application. Once logged in, a navbar displays the app title and current user details. The main view presents the Syncfusion React Grid, which immediately reflects the role’s allowed columns and actions. Logging out from the profile menu returns the user to the login screen.

## Security Note

This project is a demo and does not implement real authentication or authorization. Role selection is local and intended to illustrate RBAC behavior in the UI. Do not use this approach as-is in production.