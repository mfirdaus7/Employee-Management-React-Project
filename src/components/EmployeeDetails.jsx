function EmployeeDetails({ employee, onClose, onEdit, onDelete }) {
  if (!employee) return null;

  function handleEdit() {
    onEdit(employee);
    onClose();
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`,
    );

    if (confirmed) {
      onDelete(employee.id);
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal employee-details"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Employee Details</h2>
          <button onClick={onClose}>X</button>
        </div>

        <div className="employee-profile">
          <div className="employee-avatar">
            {employee.name.charAt(0).toUpperCase()}
          </div>
          <h2>{employee.name}</h2>
          <p>{employee.position}</p>
        </div>

        <div className="employee-info">
          <div>
            <label>Email</label>
            <p>{employee.email}</p>
          </div>
          <div>
            <label>Department</label>
            <p>{employee.department}</p>
          </div>
          <div>
            <label>Monthly Salary</label>
            <p>RM {employee.salary.toLocaleString("en-MY")}</p>
          </div>
          <div>
            <label>Status</label>
            <p>{employee.status}</p>
          </div>
          <div>
            <label>Employee ID</label>
            <p>{employee.id}</p>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button type="button" onClick={handleEdit}>
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
