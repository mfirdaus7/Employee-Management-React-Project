function EmployeeForm({ onAddEmployee, onClose }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newEmployee = {
      id: Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("position"),
      department: formData.get("department"),
      salary: Number(formData.get("salary")),
      status: formData.get("status"),
    };

    onAddEmployee(newEmployee);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Employee</h2>

          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter full name"
            required
          />

          <label>Email</label>
          <input name="email" type="email" placeholder="Enter email" required />

          <label>Position</label>
          <input
            name="position"
            type="text"
            placeholder="Enter position"
            required
          />

          <label>Department</label>
          <select name="department" required defaultValue="">
            <option value="" disabled>
              Select department
            </option>
            <option value="IT">IT</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Design">Design</option>
            <option value="Human Resources">Human Resources</option>
          </select>

          <label>Monthly Salary (RM)</label>
          <input
            name="salary"
            type="number"
            min="1"
            placeholder="Enter salary"
            required
          />

          <label>Status</label>
          <select name="status" defaultValue="Active">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
