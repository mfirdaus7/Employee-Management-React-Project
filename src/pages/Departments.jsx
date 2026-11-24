function Departments({ employees }) {
  // Dapatkan senarai department yang unik
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Departments</h2>
        <p className="text-secondary mb-0">
          Manage and monitor your departments
        </p>
      </div>

      <div className="row g-4">
        {departments.map((department) => {
          const departmentEmployees = employees.filter(
            (employee) => employee.department === department,
          );

          const totalSalary = departmentEmployees.reduce(
            (total, employee) => total + Number(employee.salary),
            0,
          );

          return (
            <div className="col-12 col-md-6 col-xl-4" key={department}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="bg-primary-subtle text-primary rounded-3 p-3">
                      <i className="bi bi-building fs-4"></i>
                    </div>

                    <span className="badge text-bg-primary">
                      {departmentEmployees.length} Employees
                    </span>
                  </div>

                  <h5 className="fw-bold mb-3">{department}</h5>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Total Employees</span>
                    <strong>{departmentEmployees.length}</strong>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="text-secondary">Monthly Salary</span>
                    <strong>RM {totalSalary.toLocaleString("en-MY")}</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {departments.length === 0 && (
        <div className="alert alert-info">No departments found.</div>
      )}
    </div>
  );
}

export default Departments;
