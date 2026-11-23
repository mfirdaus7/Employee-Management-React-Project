import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function EmployeeStatusChart({ employees }) {
  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  const statusData = [
    {
      name: "Active",
      value: activeEmployees,
    },
    {
      name: "Inactive",
      value: inactiveEmployees,
    },
  ];

  const COLORS = ["#16a34a", "#ef4444"];

  return (
    <div className="chart-card">
      <h2>Employee Status</h2>
      <p>Active and inactive employee distribution</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {statusData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmployeeStatusChart;
