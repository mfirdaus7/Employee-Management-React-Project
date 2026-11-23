function exportEmployees(employees) {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Position",
    "Department",
    "Salary",
    "Status",
  ];

  const rows = employees.map((employee) => [
    employee.id,
    employee.name,
    employee.email,
    employee.position,
    employee.department,
    employee.salary,
    employee.status,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "employee-list.csv";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default exportEmployees;
