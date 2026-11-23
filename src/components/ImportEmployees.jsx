import { useRef, useState } from "react";

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
      validRecords.map(({ rowNumber, valid, reason, ...employee }) => employee),
    );
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal import-modal">
        <div className="modal-header">
          <h2>Import Employees</h2>
          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
        />

        {error && <div className="form-error">{error}</div>}

        {preview.length > 0 && (
          <>
            <div className="import-summary">
              <div>
                <strong>{preview.length}</strong>
                <span>Total Records</span>
              </div>

              <div>
                <strong>{validRecords.length}</strong>
                <span>Valid</span>
              </div>

              <div>
                <strong>{invalidRecords.length}</strong>
                <span>Invalid</span>
              </div>
            </div>

            <div className="import-preview">
              <table>
                <thead>
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
                      <td>{employee.salary}</td>
                      <td>
                        {employee.valid ? (
                          <span className="import-valid">Valid</span>
                        ) : (
                          <span className="import-invalid">
                            {employee.reason}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={onClose}>
                Cancel
              </button>

              <button
                type="button"
                onClick={handleImport}
                disabled={validRecords.length === 0}
              >
                Import {validRecords.length} Employees
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImportEmployees;
