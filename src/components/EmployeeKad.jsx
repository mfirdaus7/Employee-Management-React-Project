function EmployeeCard({ employee, onDelete, onEdit, onView }) {
  const isActive = employee.status === "Active";

  return (
    <tr>
      <td className="text-secondary">#{employee.id}</td>

      <td>
        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none fw-semibold text-start"
          onClick={() => onView(employee)}
        >
          {employee.name}
        </button>

        <div className="small text-secondary">{employee.email}</div>
      </td>

      <td>{employee.position}</td>

      <td>{employee.department}</td>

      <td className="fw-semibold">
        RM {Number(employee.salary).toLocaleString("en-MY")}
      </td>

      <td>
        <span
          className={`badge rounded-pill ${
            isActive ? "text-bg-success" : "text-bg-secondary"
          }`}
        >
          {employee.status}
        </span>
      </td>

      <td>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(employee)}
          >
            <i className="bi bi-pencil-square me-1"></i>
            Edit
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              const confirmed = window.confirm(
                `Are you sure you want to delete ${employee.name}?`,
              );

              if (confirmed) {
                onDelete(employee.id);
              }
            }}
          >
            <i className="bi bi-trash me-1"></i>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeCard;
