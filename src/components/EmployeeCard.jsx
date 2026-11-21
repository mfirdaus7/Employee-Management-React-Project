function EmployeeCard({ employee, onDelete }) {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>
        <strong>{employee.name}</strong>
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
        <button className="delete-button" onClick={() => onDelete(employee.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default EmployeeCard;
