import { useState } from "react";

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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Import Backup JSON</h2>
          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <label>Select Backup File</label>
        <input
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
        />

        {error && <div className="form-error">{error}</div>}

        {backup && (
          <div className="import-summary">
            <div>
              <strong>{backup.employees.length}</strong>
              <span>Employees in Backup</span>
            </div>
            <div>
              <strong>{backup.version || "Unknown"}</strong>
              <span>Backup Version</span>
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="button" onClick={handleRestore} disabled={!backup}>
            Restore Backup
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportBackup;
