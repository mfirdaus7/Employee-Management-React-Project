jest.mock("../db", () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

const request = require("supertest");
const pool = require("../db");
const app = require("../app");

describe("GET /api/employees", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return all employees", async () => {
    const employees = [
      {
        id: 1,
        name: "Ali Ahmad",
        email: "ali@gmail.com",
        position: "Web Developer",
        department: "IT",
        salary: "4500.00",
        status: "Active",
      },
    ];

    pool.query.mockResolvedValue({
      rows: employees,
    });

    const response = await request(app).get("/api/employees");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(employees);
    expect(pool.query).toHaveBeenCalledTimes(1);
  });
});

test("should return 500 when database query fails", async () => {
  pool.query.mockRejectedValue(new Error("Database connection failed"));

  const response = await request(app).get("/api/employees");

  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    message: "Failed to fetch employees.",
  });
});

test("should create a new employee", async () => {
  jest.clearAllMocks();

  const newEmployee = {
    name: "Ali Ahmad",
    email: "ali@gmail.com",
    position: "Web Developer",
    department: "IT",
    salary: 4500,
    status: "Active",
  };

  const createdEmployee = {
    id: 1,
    ...newEmployee,
  };

  pool.query.mockResolvedValue({
    rows: [createdEmployee],
  });

  const response = await request(app).post("/api/employees").send(newEmployee);

  expect(response.status).toBe(201);
  expect(response.body.employee).toEqual(createdEmployee);
  expect(pool.query).toHaveBeenCalledTimes(1);
});

test("should reject an invalid email", async () => {
  jest.clearAllMocks();

  const invalidEmployee = {
    name: "Ali Ahmad",
    email: "ali-invalid",
    position: "Web Developer",
    department: "IT",
    salary: 4500,
    status: "Active",
  };

  const response = await request(app)
    .post("/api/employees")
    .send(invalidEmployee);

  expect(response.status).toBe(400);
  expect(response.body.message).toBe("Invalid email format.");
  expect(pool.query).not.toHaveBeenCalled();
});
