function Dashboard({ employees }) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  const totalSalary = employees.reduce(
    (total, employee) => total + employee.salary,
    0,
  );

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Employee Management System.</p>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <h2>{totalEmployees}</h2>
        </div>

        <div className="stat-card">
          <h3>Active Employees</h3>
          <h2>{activeEmployees}</h2>
        </div>

        <div className="stat-card">
          <h3>Inactive Employees</h3>
          <h2>{inactiveEmployees}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Monthly Salary</h3>
          <h2>RM {totalSalary.toLocaleString("en-MY")}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
