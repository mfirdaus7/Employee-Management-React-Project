import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

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
      name: formData.get("name").trim(),
      email: email,
      position: formData.get("position").trim(),
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
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Full Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>

            <Form.Control
              name="name"
              type="text"
              placeholder="Enter full name"
              defaultValue={employeeToEdit?.name || ""}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              defaultValue={employeeToEdit?.email || ""}
              onChange={() => setError("")}
              required
            />
          </Form.Group>

          {/* Position */}
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>

            <Form.Control
              name="position"
              type="text"
              placeholder="Enter position"
              defaultValue={employeeToEdit?.position || ""}
              required
            />
          </Form.Group>

          {/* Department */}
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>

            <Form.Select
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
            </Form.Select>
          </Form.Group>

          {/* Salary */}
          <Form.Group className="mb-3">
            <Form.Label>Monthly Salary (RM)</Form.Label>

            <Form.Control
              name="salary"
              type="number"
              min="1"
              placeholder="Enter salary"
              defaultValue={employeeToEdit?.salary || ""}
              onChange={() => setError("")}
              required
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>

            <Form.Select
              name="status"
              defaultValue={employeeToEdit?.status || "Active"}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" type="submit">
            {isEditing ? "Update Employee" : "Save Employee"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EmployeeForm;
