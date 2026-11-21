import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employee";

import initialEmployees from "./data/employees";

function App() {
  const [employees, setEmployees] = useState(initialEmployees);

  function addEmployee(newEmployee) {
    setEmployees((previousEmployees) => {
      const nextId =
        previousEmployees.length > 0
          ? Math.max(...previousEmployees.map((employee) => employee.id)) + 1
          : 1;

      return [
        ...previousEmployees,
        {
          ...newEmployee,
          id: nextId,
        },
      ];
    });
  }

  function deleteEmployee(employeeId) {
    setEmployees((previousEmployees) =>
      previousEmployees.filter((employee) => employee.id !== employeeId),
    );
  }

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Header />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard employees={employees} />} />

              <Route
                path="/employees"
                element={
                  <Employees
                    employees={employees}
                    onAddEmployee={addEmployee}
                    onDeleteEmployee={deleteEmployee}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
