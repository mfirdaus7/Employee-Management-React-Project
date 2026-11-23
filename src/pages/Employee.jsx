import { useState } from "react";
import EmployeeCard from "../components/EmployeeKad";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeDetails from "../components/EmployeeDetails";
import exportEmployees from "../utils/exportEmployees";
import ImportEmployees from "../components/ImportEmployees";
import exportBackup from "../utils/exportBackup";
import ImportBackup from "../components/ImportBackup";

function Employees({
  employees,
  onAddEmployee,
  onDeleteEmployee,
  onUpdateEmployee,
  onImportEmployees,
  onRestoreEmployees,
}) {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [showBackupImport, setShowBackupImport] = useState(false);

  function handleEditEmployee(employee) {
    setEmployeeToEdit(employee);
    setShowForm(true);
  }

  function handleImportEmployees(importedEmployees) {
    onImportEmployees(importedEmployees);
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" || employee.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "salary-high":
        return b.salary - a.salary;
      case "salary-low":
        return a.salary - b.salary;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  const startIndex = (currentPage - 1) * employeesPerPage;

  const currentEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + employeesPerPage,
  );

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Employees</h1>
          <p>Manage your employee records</p>
        </div>

        <div className="page-actions">
          <div className="page-actions">
            <button
              className="import-button"
              onClick={() => setShowImport(true)}
            >
              Import CSV
            </button>

            <button
              className="export-button"
              onClick={() => exportEmployees(sortedEmployees)}
            >
              Export CSV
            </button>

            <button
              className="backup-button"
              onClick={() => exportBackup(employees)}
            >
              Backup JSON
            </button>
            <button
              className="restore-button"
              onClick={() => setShowBackupImport(true)}
            >
              Restore JSON
            </button>
            <button
              onClick={() => {
                setEmployeeToEdit(null);
                setShowForm(true);
              }}
            >
              + Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="employee-toolbar">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={departmentFilter}
          onChange={(event) => {
            setDepartmentFilter(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="Quality Assurance">Quality Assurance</option>
          <option value="Design">Design</option>
          <option value="Human Resources">Human Resources</option>
        </select>
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="name-asc">Name: A–Z</option>
          <option value="name-desc">Name: Z–A</option>
          <option value="salary-high">Salary: Highest</option>
          <option value="salary-low">Salary: Lowest</option>
        </select>
        <select
          value={employeesPerPage}
          onChange={(event) => {
            setEmployeesPerPage(Number(event.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>

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
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onDelete={onDeleteEmployee}
                  onEdit={handleEditEmployee}
                  onView={setSelectedEmployee}
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

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={handleEditEmployee}
          onDelete={onDeleteEmployee}
        />
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((page) => page - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {showImport && (
        <ImportEmployees
          employees={employees}
          onImport={handleImportEmployees}
          onClose={() => setShowImport(false)}
        />
      )}

      {showForm && (
        <EmployeeForm
          employees={employees}
          employeeToEdit={employeeToEdit}
          onAddEmployee={onAddEmployee}
          onUpdateEmployee={onUpdateEmployee}
          onClose={() => {
            setShowForm(false);
            setEmployeeToEdit(null);
          }}
        />
      )}

      {showBackupImport && (
        <ImportBackup
          onRestore={onRestoreEmployees}
          onClose={() => setShowBackupImport(false)}
        />
      )}
    </div>
  );
}

export default Employees;
