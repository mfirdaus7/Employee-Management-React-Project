import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employee";

import initialEmployees from "./data/employees";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  restoreEmployees,
} from "./utils/api";

function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");

    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data);
        console.log("Employees loaded from API:", data);
      } catch (error) {
        console.error("Unable to load employees:", error);
      }
    }

    loadEmployees();
  }, []);

  async function addEmployee(newEmployee) {
    try {
      const createdEmployee = await createEmployee(newEmployee);

      setEmployees((previousEmployees) => [
        ...previousEmployees,
        createdEmployee,
      ]);

      alert("Employee added successfully!");
    } catch (error) {
      alert(error.message);
    }
  }

  async function updateEmployeeRecord(updatedEmployee) {
    try {
      const savedEmployee = await updateEmployee(updatedEmployee);

      setEmployees((previousEmployees) =>
        previousEmployees.map((employee) =>
          employee.id === savedEmployee.id ? savedEmployee : employee,
        ),
      );

      alert("Employee updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  }
  async function deleteEmployeeRecord(employeeId) {
    try {
      await deleteEmployee(employeeId);

      setEmployees((previousEmployees) =>
        previousEmployees.filter((employee) => employee.id !== employeeId),
      );

      alert("Employee deleted successfully!");
    } catch (error) {
      alert(error.message);
    }
  }

  async function importEmployees(importedEmployees) {
    try {
      const createdEmployees = [];

      for (const employee of importedEmployees) {
        const createdEmployee = await createEmployee(employee);
        createdEmployees.push(createdEmployee);
      }

      setEmployees((previousEmployees) => [
        ...previousEmployees,
        ...createdEmployees,
      ]);

      alert(`${createdEmployees.length} employees imported successfully!`);
    } catch (error) {
      alert(error.message);
    }
  }

  async function restoreEmployeesRecord(backupEmployees) {
    try {
      const restoredData = await restoreEmployees(backupEmployees);

      setEmployees(restoredData);

      alert("Backup restored successfully!");
    } catch (error) {
      alert(error.message);
    }
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
                    onDeleteEmployee={deleteEmployeeRecord}
                    onUpdateEmployee={updateEmployeeRecord}
                    onImportEmployees={importEmployees}
                    onRestoreEmployees={restoreEmployeesRecord}
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
