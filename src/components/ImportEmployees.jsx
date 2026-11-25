import { useRef, useState } from "react";
import { Modal, Form, Button, Alert, Table, Badge } from "react-bootstrap";

function ImportEmployees({ employees, onImport, onClose }) {
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a CSV file.");
      setPreview([]);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const lines = e.target.result
          .replace(/^\uFEFF/, "")
          .trim()
          .split(/\r?\n/);

        if (lines.length < 2) {
          setError("CSV file contains no employee records.");
          setPreview([]);
          return;
        }

        const headers = lines[0]
          .split(",")
          .map((header) => header.trim().toLowerCase());

        const requiredHeaders = [
          "name",
          "email",
          "position",
          "department",
          "salary",
          "status",
        ];

        const missingHeaders = requiredHeaders.filter(
          (header) => !headers.includes(header),
        );

        if (missingHeaders.length > 0) {
          setError(`Missing columns: ${missingHeaders.join(", ")}`);
          setPreview([]);
          return;
        }

        const existingEmails = new Set(
          employees.map((employee) => employee.email.toLowerCase()),
        );

        const importedEmails = new Set();

        const records = lines
          .slice(1)
          .filter((line) => line.trim() !== "")
          .map((line, index) => {
            const values = line
              .split(",")
              .map((value) =>
                value.trim().replace(/^"|"$/g, "").replace(/""/g, '"'),
              );

            const employee = {
              name: values[headers.indexOf("name")],
              email: values[headers.indexOf("email")].toLowerCase(),
              position: values[headers.indexOf("position")],
              department: values[headers.indexOf("department")],
              salary: Number(values[headers.indexOf("salary")]),
              status: values[headers.indexOf("status")],
            };

            let reason = "";

            if (
              !employee.name ||
              !employee.email ||
              !employee.position ||
              !employee.department
            ) {
              reason = "Missing required information";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
              reason = "Invalid email";
            } else if (
              !Number.isFinite(employee.salary) ||
              employee.salary <= 0
            ) {
              reason = "Invalid salary";
            } else if (!["Active", "Inactive"].includes(employee.status)) {
              reason = "Invalid status";
            } else if (
              existingEmails.has(employee.email) ||
              importedEmails.has(employee.email)
            ) {
              reason = "Duplicate email";
            }

            if (!reason) {
              importedEmails.add(employee.email);
            }

            return {
              ...employee,
              rowNumber: index + 2,
              valid: !reason,
              reason,
            };
          });

        setPreview(records);
        setError("");
      } catch {
        setError("Unable to read CSV file.");
        setPreview([]);
      }
    };

    reader.onerror = () => {
      setError("Unable to read CSV file.");
    };

    reader.readAsText(file);
  }

  const validRecords = preview.filter((record) => record.valid);
  const invalidRecords = preview.filter((record) => !record.valid);

  function handleImport() {
    onImport(
      validRecords.map((record) =>
        Object.fromEntries(
          Object.entries(record).filter(
            ([key]) => !["rowNumber", "valid", "reason"].includes(key),
          ),
        ),
      ),
    );

    onClose();
  }
  return (
    <Modal show={true} onHide={onClose} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Import Employees</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Select CSV File</Form.Label>

          <Form.Control
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
          />

          <Form.Text className="text-secondary">
            Upload a CSV file containing employee records.
          </Form.Text>
        </Form.Group>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {preview.length > 0 && (
          <>
            {/* Import Summary */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="bg-light rounded-3 p-3 text-center">
                  <h4 className="fw-bold mb-1">{preview.length}</h4>
                  <small className="text-secondary">Total Records</small>
                </div>
              </div>

              <div className="col-4">
                <div className="bg-success-subtle rounded-3 p-3 text-center">
                  <h4 className="fw-bold text-success mb-1">
                    {validRecords.length}
                  </h4>
                  <small className="text-success">Valid</small>
                </div>
              </div>

              <div className="col-4">
                <div className="bg-danger-subtle rounded-3 p-3 text-center">
                  <h4 className="fw-bold text-danger mb-1">
                    {invalidRecords.length}
                  </h4>
                  <small className="text-danger">Invalid</small>
                </div>
              </div>
            </div>

            {/* Preview Table */}
            <h6 className="fw-bold mb-3">Import Preview</h6>

            <div className="table-responsive border rounded-3">
              <Table hover bordered className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Result</th>
                  </tr>
                </thead>

                <tbody>
                  {preview.map((employee) => (
                    <tr key={employee.rowNumber}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>
                        RM {Number(employee.salary).toLocaleString("en-MY")}
                      </td>
                      <td>
                        {employee.valid ? (
                          <Badge bg="success">Valid</Badge>
                        ) : (
                          <Badge bg="danger">{employee.reason}</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleImport}
          disabled={validRecords.length === 0}
        >
          <i className="bi bi-upload me-2"></i>
          Import {validRecords.length} Employees
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImportEmployees;
