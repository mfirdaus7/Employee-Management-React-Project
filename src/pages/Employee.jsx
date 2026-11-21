import { useState } from "react";
import EmployeeCard from "../components/EmployeeKad";
import EmployeeForm from "../components/EmployeeForm";

function Employees({ employees, onAddEmployee, onDeleteEmployee }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Employees</h1>
          <p>Manage your employee records</p>
        </div>

        <button onClick={() => setShowForm(true)}>+ Add Employee</button>
      </div>

      <div className="employee-toolbar">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <span>{filteredEmployees.length} employees found</span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onDelete={onDeleteEmployee}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <EmployeeForm
          onAddEmployee={onAddEmployee}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Employees;
