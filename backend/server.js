const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all employees

app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees ORDER BY id ASC");

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);

    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
});

// RESTORE all employees

app.put("/api/employees/restore", async (req, res) => {
  const restoredEmployees = req.body;

  if (!Array.isArray(restoredEmployees)) {
    return res.status(400).json({
      message: "Invalid employee data.",
    });
  }

  let client;

  try {
    client = await pool.connect();
    await client.query("BEGIN");

    await client.query("DELETE FROM employees");

    for (const employee of restoredEmployees) {
      await client.query(
        `INSERT INTO employees
         (id, name, email, position, department, salary, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          employee.id,
          employee.name,
          employee.email,
          employee.position,
          employee.department,
          employee.salary,
          employee.status,
        ],
      );
    }

    await client.query(`
      SELECT setval(
        pg_get_serial_sequence('employees', 'id'),
        COALESCE((SELECT MAX(id) FROM employees), 1),
        EXISTS(SELECT 1 FROM employees)
      )
    `);

    await client.query("COMMIT");

    res.json({
      message: "Employees restored successfully.",
      employees: restoredEmployees,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Restore error:", error);

    res.status(500).json({
      message: "Failed to restore employees.",
    });
  } finally {
    if (client) {
      client.release();
    }
  }
});

// POST - Add new employee

app.post("/api/employees", async (req, res) => {
  const { name, email, position, department, salary, status } = req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !position?.trim() ||
    !department?.trim() ||
    !status?.trim() ||
    salary === undefined ||
    salary === null ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) < 0
  ) {
    return res.status(400).json({
      message: "Please provide valid employee details.",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      message: "Invalid email format.",
    });
  }
  try {
    const result = await pool.query(
      `INSERT INTO employees
       (name, email, position, department, salary, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, position, department, salary, status],
    );

    res.status(201).json({
      message: "Employee created successfully.",
      employee: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    console.error("Error creating employee:", error);

    res.status(500).json({
      message: "Failed to create employee.",
    });
  }
});

// PUT - Update employee

app.put("/api/employees/:id", async (req, res) => {
  const employeeId = Number(req.params.id);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    return res.status(400).json({
      message: "Invalid employee ID.",
    });
  }

  const { name, email, position, department, salary, status } = req.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !position?.trim() ||
    !department?.trim() ||
    !status?.trim() ||
    salary === undefined ||
    salary === null ||
    !Number.isFinite(Number(salary)) ||
    Number(salary) < 0
  ) {
    return res.status(400).json({
      message: "Please provide valid employee details.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      message: "Invalid email format.",
    });
  }

  try {
    const result = await pool.query(
      `UPDATE employees
       SET name = $1,
           email = $2,
           position = $3,
           department = $4,
           salary = $5,
           status = $6
       WHERE id = $7
       RETURNING *`,
      [name, email, position, department, salary, status, employeeId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    res.json({
      message: "Employee updated successfully.",
      employee: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    console.error("Error updating employee:", error);

    res.status(500).json({
      message: "Failed to update employee.",
    });
  }
});

// DELETE - Remove employee

app.delete("/api/employees/:id", async (req, res) => {
  const employeeId = Number(req.params.id);

  if (!Number.isInteger(employeeId) || employeeId <= 0) {
    return res.status(400).json({
      message: "Invalid employee ID.",
    });
  }

  try {
    const result = await pool.query(
      `DELETE FROM employees
       WHERE id = $1
       RETURNING *`,
      [employeeId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }

    res.json({
      message: "Employee deleted successfully.",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting employee:", error);

    res.status(500).json({
      message: "Failed to delete employee.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
