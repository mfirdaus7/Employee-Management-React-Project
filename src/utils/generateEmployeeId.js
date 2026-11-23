function generateEmployeeId(employees) {
  if (employees.length === 0) {
    return 1;
  }

  const highestId = Math.max(...employees.map((employee) => employee.id));

  return highestId + 1;
}

export default generateEmployeeId;
