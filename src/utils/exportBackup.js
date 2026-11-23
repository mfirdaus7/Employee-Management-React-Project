function exportBackup(employees) {
  const backupData = {
    application: "Employee Management System",
    version: "1.0",
    backupDate: new Date().toISOString(),
    totalEmployees: employees.length,
    employees: employees,
  };

  const jsonContent = JSON.stringify(backupData, null, 2);

  const blob = new Blob([jsonContent], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ems-backup.json";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default exportBackup;
