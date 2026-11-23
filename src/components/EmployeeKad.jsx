function EmployeeCard({ employee, onDelete, onEdit, onView }) {
  return (
    <tr>
      <td>{employee.id}</td>

      <td>
        <strong className="employee-name" onClick={() => onView(employee)}>
          {employee.name}
        </strong>
        <br />
        <small>{employee.email}</small>
      </td>

      <td>{employee.position}</td>
      <td>{employee.department}</td>

      <td>RM {employee.salary.toLocaleString("en-MY")}</td>

      <td>
        <span className={`status ${employee.status.toLowerCase()}`}>
          {employee.status}
        </span>
      </td>

      <td>
        <button className="edit-button" onClick={() => onEdit(employee)}>
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => {
            const confirmed = window.confirm(
              `Are you sure you want to delete ${employee.name}?`,
            );

            if (confirmed) {
              onDelete(employee.id);
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default EmployeeCard;
