const API_URL = "http://localhost:5000/api";

export async function getEmployees() {
  const response = await fetch(`${API_URL}/employees`);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
}

export async function createEmployee(employee) {
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create employee");
  }

  return data.employee;
}

export async function updateEmployee(employee) {
  const response = await fetch(`${API_URL}/employees/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update employee");
  }

  return data.employee;
}

export async function deleteEmployee(employeeId) {
  const response = await fetch(`${API_URL}/employees/${employeeId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete employee");
  }

  return data.employee;
}

export async function restoreEmployees(employees) {
  const response = await fetch(`${API_URL}/employees/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employees),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to restore employees");
  }

  return data.employees;
}
