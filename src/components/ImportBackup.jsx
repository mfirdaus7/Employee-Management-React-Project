import { useState } from "react";
import { Modal, Form, Button, Alert, Badge } from "react-bootstrap";

function ImportBackup({ onRestore, onClose }) {
  const [backup, setBackup] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please select a JSON backup file.");
      setBackup(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (
          data.application !== "Employee Management System" ||
          !Array.isArray(data.employees)
        ) {
          throw new Error("Invalid backup format.");
        }

        const employeeIds = data.employees.map((employee) => employee.id);

        const uniqueIds = new Set(employeeIds);

        if (uniqueIds.size !== employeeIds.length) {
          throw new Error("Backup contains duplicate employee IDs.");
        }

        const validEmployees = data.employees.every(
          (employee) =>
            employee &&
            Number.isInteger(employee.id) &&
            employee.id > 0 &&
            typeof employee.name === "string" &&
            employee.name.trim() !== "" &&
            typeof employee.email === "string" &&
            typeof employee.position === "string" &&
            typeof employee.department === "string" &&
            Number.isFinite(employee.salary) &&
            employee.salary > 0 &&
            ["Active", "Inactive"].includes(employee.status),
        );

        if (!validEmployees) {
          throw new Error("Backup contains invalid employee records.");
        }

        setBackup(data);
        setError("");
      } catch (error) {
        setBackup(null);
        setError(error.message || "Unable to read backup file.");
      }
    };

    reader.onerror = () => {
      setError("Unable to read backup file.");
      setBackup(null);
    };

    reader.readAsText(file);
  }

  function handleRestore() {
    if (!backup) return;

    const confirmed = window.confirm(
      `Restore ${backup.employees.length} employees? This will replace all current employee records.`,
    );

    if (confirmed) {
      onRestore(backup.employees);
      onClose();
    }
  }

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Import Backup JSON</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Select Backup File</Form.Label>

          <Form.Control
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
          />

          <Form.Text className="text-secondary">
            Select a previously exported EMS JSON backup.
          </Form.Text>
        </Form.Group>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {backup && (
          <div className="bg-success-subtle rounded-3 p-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-check-circle-fill text-success fs-4"></i>
              <strong className="text-success">
                Backup file validated successfully
              </strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Employees in Backup</span>
              <Badge bg="primary">{backup.employees.length}</Badge>
            </div>

            <div className="d-flex justify-content-between">
              <span className="text-secondary">Backup Version</span>
              <strong>{backup.version || "Unknown"}</strong>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="warning" onClick={handleRestore} disabled={!backup}>
          <i className="bi bi-cloud-upload me-2"></i>
          Restore Backup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImportBackup;
