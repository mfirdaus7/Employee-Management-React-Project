import DepartmentChart from "../components/DepartmentChart";
import EmployeeStatusChart from "../components/EmployeeStatusChart";

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
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your employee management system</p>
        </div>
      </div>

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

      <div className="dashboard-charts">
        <DepartmentChart employees={employees} />
        <EmployeeStatusChart employees={employees} />
      </div>
    </div>
  );
}

export default Dashboard;
