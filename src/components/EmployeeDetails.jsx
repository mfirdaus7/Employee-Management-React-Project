import { Modal, Button, Badge } from "react-bootstrap";

function EmployeeDetails({ employee, onClose, onEdit, onDelete }) {
  if (!employee) return null;

  const isActive = employee.status === "Active";

  function handleEdit() {
    onEdit(employee);
    onClose();
  }

  async function handleDelete() {
    const deleted = await onDelete(employee.id);

    if (deleted) {
      onClose();
    }
  }
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Employee Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Employee Profile */}
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{
              width: "80px",
              height: "80px",
              fontSize: "32px",
            }}
          >
            {employee.name.charAt(0).toUpperCase()}
          </div>

          <h4 className="fw-bold mb-1">{employee.name}</h4>
          <p className="text-secondary mb-2">{employee.position}</p>

          <Badge bg={isActive ? "success" : "secondary"}>
            {employee.status}
          </Badge>
        </div>

        <hr />

        {/* Employee Information */}
        <div className="row g-3">
          <div className="col-12">
            <small className="text-secondary">Email</small>
            <p className="fw-semibold mb-0">{employee.email}</p>
          </div>

          <div className="col-6">
            <small className="text-secondary">Department</small>
            <p className="fw-semibold mb-0">{employee.department}</p>
          </div>

          <div className="col-6">
            <small className="text-secondary">Employee ID</small>
            <p className="fw-semibold mb-0">#{employee.id}</p>
          </div>

          <div className="col-12">
            <small className="text-secondary">Monthly Salary</small>
            <h5 className="fw-bold text-primary mb-0">
              RM {Number(employee.salary).toLocaleString("en-MY")}
            </h5>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="outline-danger" onClick={handleDelete}>
          <i className="bi bi-trash me-1"></i>
          Delete
        </Button>

        <Button variant="primary" onClick={handleEdit}>
          <i className="bi bi-pencil-square me-1"></i>
          Edit Employee
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmployeeDetails;
