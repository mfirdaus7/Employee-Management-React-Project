import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>EMS</h2>
        <p>Employee Management</p>
      </div>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Employees
        </NavLink>

        <a href="#" className="nav-link">
          Departments
        </a>

        <a href="#" className="nav-link">
          Settings
        </a>
      </nav>

      <div className="sidebar-footer">
        <p>EMS Version 1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
