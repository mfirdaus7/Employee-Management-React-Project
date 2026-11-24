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
    (total, employee) => total + Number(employee.salary),
    0,
  );

  const statistics = [
    {
      title: "Total Employees",
      value: totalEmployees,
      color: "primary",
      icon: "bi-people",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      color: "success",
      icon: "bi-person-check",
    },
    {
      title: "Inactive Employees",
      value: inactiveEmployees,
      color: "danger",
      icon: "bi-person-x",
    },
    {
      title: "Total Monthly Salary",
      value: `RM ${totalSalary.toLocaleString("en-MY")}`,
      color: "warning",
      icon: "bi-cash-stack",
    },
  ];

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>

        <p className="text-secondary mb-0">
          Overview of your employee management system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        {statistics.map((stat, index) => (
          <div className="col-12 col-md-6 col-xl-3" key={index}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-secondary mb-2">{stat.title}</p>

                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                </div>

                <div
                  className={`bg-${stat.color}-subtle text-${stat.color} rounded-3 p-3`}
                >
                  <i className={`${stat.icon} fs-3`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Charts */}
      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <DepartmentChart employees={employees} />
        </div>

        <div className="col-12 col-xl-6">
          <EmployeeStatusChart employees={employees} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
