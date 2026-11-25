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
  pageSize,
  confirmDelete,
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

  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [showBackupImport, setShowBackupImport] = useState(false);

  function handleEditEmployee(employee) {
    setEmployeeToEdit(employee);
    setShowForm(true);
  }

  async function handleDeleteEmployee(employeeId) {
    const employee = employees.find((item) => item.id === employeeId);

    if (!employee) return false;

    if (confirmDelete) {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${employee.name}?`,
      );

      if (!confirmed) return false;
    }

    return await onDeleteEmployee(employeeId);
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
        return Number(b.salary) - Number(a.salary);
      case "salary-low":
        return Number(a.salary) - Number(b.salary);
      default:
        return a.name.localeCompare(b.name);
    }
  });
  const totalPages = Math.ceil(sortedEmployees.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const currentEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Employees</h2>

          <p className="text-secondary mb-0">Manage your employee records</p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowImport(true)}
          >
            <i className="bi bi-upload me-2"></i>
            Import CSV
          </button>

          <button
            className="btn btn-outline-success"
            onClick={() => exportEmployees(sortedEmployees)}
          >
            <i className="bi bi-file-earmark-spreadsheet me-2"></i>
            Export CSV
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => exportBackup(employees)}
          >
            <i className="bi bi-cloud-download me-2"></i>
            Backup
          </button>

          <button
            className="btn btn-outline-warning"
            onClick={() => setShowBackupImport(true)}
          >
            <i className="bi bi-cloud-upload me-2"></i>
            Restore
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEmployeeToEdit(null);
              setShowForm(true);
            }}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Employee
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-lg-4">
              <label className="form-label fw-semibold">Search Employee</label>

              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search name, position or department..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-2">
              <label className="form-label fw-semibold">Department</label>

              <select
                className="form-select"
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
            </div>

            <div className="col-12 col-md-6 col-lg-2">
              <label className="form-label fw-semibold">Status</label>

              <select
                className="form-select"
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
            </div>

            <div className="col-12 col-md-6 col-lg-2">
              <label className="form-label fw-semibold">Sort By</label>

              <select
                className="form-select"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="name-asc">Name: A–Z</option>
                <option value="name-desc">Name: Z–A</option>
                <option value="salary-high">Salary: Highest</option>
                <option value="salary-low">Salary: Lowest</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-2">
              <label className="form-label fw-semibold">Per Page</label>

              <select className="form-select" value={pageSize} disabled>
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          <div className="mt-3 text-secondary small">
            <i className="bi bi-people me-2"></i>
            {filteredEmployees.length} employees found
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="fw-bold mb-0">Employee Directory</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
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
                    onDelete={handleDeleteEmployee}
                    onEdit={handleEditEmployee}
                    onView={setSelectedEmployee}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-secondary py-5">
                    <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="card-footer bg-white d-flex flex-wrap justify-content-between align-items-center gap-3">
          <small className="text-secondary">
            Showing {currentEmployees.length > 0 ? startIndex + 1 : 0}
            {" - "}
            {startIndex + currentEmployees.length}
            {" of "}
            {sortedEmployees.length} employees
          </small>

          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((page) => page - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              <li className="page-item disabled">
                <span className="page-link">
                  Page {currentPage} of {totalPages || 1}
                </span>
              </li>

              <li
                className={`page-item ${
                  currentPage === totalPages || totalPages === 0
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Employee Details */}
      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}

      {/* Import CSV */}
      {showImport && (
        <ImportEmployees
          employees={employees}
          onImport={handleImportEmployees}
          onClose={() => setShowImport(false)}
        />
      )}

      {/* Add / Edit Employee */}
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

      {/* Restore Backup */}
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
