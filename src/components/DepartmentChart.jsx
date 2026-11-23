import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DepartmentChart({ employees }) {
  const departmentData = employees.reduce((result, employee) => {
    const existingDepartment = result.find(
      (item) => item.department === employee.department,
    );

    if (existingDepartment) {
      existingDepartment.total += 1;
    } else {
      result.push({
        department: employee.department,
        total: 1,
      });
    }

    return result;
  }, []);

  return (
    <div className="chart-card">
      <h2>Employees by Department</h2>
      <p>Employee distribution across departments</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DepartmentChart;
