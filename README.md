# Employee Management System

A full-stack Employee Management System built with React, Node.js, Express.js, and PostgreSQL. This application allows users to manage employee records through a responsive dashboard and RESTful API.

## Features

### Dashboard

- View total employees.
- Monitor active and inactive employees.
- Calculate total monthly salary.
- Visualize employee distribution by department and status.

### Employee Management

- Add, edit, and delete employee records.
- Search employees by name, position, or department.
- Filter employees by department and employment status.
- Sort employee records.
- View employee details.
- Pagination support.

### Data Management

- Import employee records from CSV.
- Export employee records to CSV.
- Backup and restore employee data using JSON.
- Store employee records in PostgreSQL.

### Backend & API

- RESTful API using Express.js.
- PostgreSQL database integration.
- CRUD operations.
- Input validation.
- Duplicate email handling.
- Error handling.

## Technology Stack

**Frontend**

- React
- Vite
- React Router
- Recharts
- CSS
- JavaScript

**Backend**

- Node.js
- Express.js
- PostgreSQL
- node-postgres (`pg`)
- dotenv
- CORS

**Development Tools**

- Visual Studio Code
- Git & GitHub
- Postman / PowerShell

## Project Structure

```text
Employee-Management-React-Project/
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd Employee-Management-React-Project
```

### 2. Setup PostgreSQL Database

Create a database named:

```sql
CREATE DATABASE employee_management;
```

Connect to the database and create the employees table:

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  salary NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL
);
```

### 3. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=employee_management
DB_PASSWORD=your_password
DB_PORT=5432
```

Start the backend:

```bash
node server.js
```

Backend API:

```text
http://localhost:5000
```

### 4. Setup Frontend

Open another terminal at the project root:

```bash
npm install
npm run dev
```

Open the local development URL displayed by Vite.

## API Endpoints

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/employees`         | Get all employees     |
| POST   | `/api/employees`         | Create employee       |
| PUT    | `/api/employees/:id`     | Update employee       |
| DELETE | `/api/employees/:id`     | Delete employee       |
| PUT    | `/api/employees/restore` | Restore employee data |

## Future Improvements

- Improve backend validation and security.
- Add authentication and authorization.
- Implement automated API and UI testing with Playwright.
- Add deployment and CI/CD pipeline.
- Improve application performance and user experience.

## Author

**MUHD FIRDAUS**

Full-Stack Developer | Frontend Development | Software Quality Engineering
