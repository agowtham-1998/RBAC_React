# RBAC Admin Dashboard

## Project Overview

The RBAC (Role-Based Access Control) Admin Dashboard is a web application designed to manage users, roles, and permissions. It offers an intuitive interface for administrators to efficiently handle user data and security permissions. The dashboard is built using React and Material-UI for a responsive and interactive user experience.

## Features

- **User Management**: View, add, edit, and delete users with roles and statuses.
- **Role Management**: Define and edit roles, assign permissions to roles.
- **Permissions Management**: Add and manage permissions dynamically.
- **Responsive Design**: Ensures a seamless experience across devices and screen sizes.
- **Feedback Mechanisms**: Immediate feedback on user actions with loading indicators and snackbar notifications.
- **Form Validation**: Provides instant validation to ensure data integrity.

## Setup Instructions

1. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd rbac-dashboard
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run JSON Server**:
    Ensure JSON Server is running to mock API calls.
    ```sh
    npx json-server --watch db.json --port 3001
    ```

4. **Start the React Application**:
    ```sh
    npm start
    ```

## File Structure

```plaintext
rbac-dashboard/
├── public/
│   ├── index.html
├── src/
│   ├── api/
│   │   ├── index.js
│   ├── components/
│   │   ├── common/
│   │   │   ├── Loading.js
│   │   │   ├── Dialog.js
│   │   ├── User/
│   │   │   ├── Users.js
│   │   │   ├── UserForm.js
│   │   ├── Role/
│   │   │   ├── Roles.js
│   │   │   ├── RoleForm.js
│   │   ├── Permission/
│   │   │   ├── Permissions.js
│   │   │   ├── PermissionForm.js
│   │   ├── NavBar.js
│   │   ├── Home.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
├── db.json
├── package.json
├── README.md
