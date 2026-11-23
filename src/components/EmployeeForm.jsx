import { useState } from "react";

function EmployeeForm({
  employees,
  employeeToEdit,
  onAddEmployee,
  onUpdateEmployee,
  onClose,
}) {
  const isEditing = Boolean(employeeToEdit);

  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const salary = Number(formData.get("salary"));

    if (!Number.isFinite(salary) || salary <= 0) {
      setError("Salary must be greater than zero!");
      return;
    }

    const email = formData.get("email").trim().toLowerCase();

    const duplicateEmail = employees.some(
      (employee) =>
        employee.email.toLowerCase() === email &&
        employee.id !== employeeToEdit?.id,
    );

    if (duplicateEmail) {
      setError("This email address is already registered!");
      return;
    }

    const employeeData = {
      name: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("position"),
      department: formData.get("department"),
      salary: salary,
      status: formData.get("status"),
    };

    if (isEditing) {
      onUpdateEmployee({
        ...employeeToEdit,
        ...employeeData,
      });
    } else {
      onAddEmployee(employeeData);
    }

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>

          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          <label>Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter full name"
            defaultValue={employeeToEdit?.name || ""}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            defaultValue={employeeToEdit?.email || ""}
            onChange={() => setError("")}
            required
          />

          <label>Position</label>
          <input
            name="position"
            type="text"
            placeholder="Enter position"
            defaultValue={employeeToEdit?.position || ""}
            required
          />

          <label>Department</label>
          <select
            name="department"
            defaultValue={employeeToEdit?.department || ""}
            required
          >
            <option value="" disabled>
              Select department
            </option>
            <option value="IT">IT</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Design">Design</option>
            <option value="Human Resources">Human Resources</option>
          </select>

          <label>Monthly Salary (RM)</label>
          <input
            name="salary"
            type="number"
            min="1"
            placeholder="Enter salary"
            defaultValue={employeeToEdit?.salary || ""}
            onChange={() => setError("")}
            required
          />

          <label>Status</label>
          <select
            name="status"
            defaultValue={employeeToEdit?.status || "Active"}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              {isEditing ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
