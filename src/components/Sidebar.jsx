import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navClass = ({ isActive }) =>
    `nav-link rounded-3 px-3 py-3 mb-2 ${
      isActive ? "active bg-primary text-white" : "text-light"
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      )}

      <aside className={`app-sidebar ${isOpen ? "mobile-open" : ""}`}>
        {/* Brand */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold mb-1">EMS</h2>
            <p className="text-info small mb-0">Employee Management</p>
          </div>

          <button
            type="button"
            className="btn btn-outline-light d-lg-none"
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="nav flex-column">
          <NavLink to="/" end className={navClass} onClick={onClose}>
            <i className="bi bi-grid me-2"></i>
            Dashboard
          </NavLink>

          <NavLink to="/employees" className={navClass} onClick={onClose}>
            <i className="bi bi-people me-2"></i>
            Employees
          </NavLink>

          <NavLink to="/departments" className={navClass} onClick={onClose}>
            <i className="bi bi-building me-2"></i>
            Departments
          </NavLink>

          <NavLink to="/settings" className={navClass} onClick={onClose}>
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-info small">EMS Version 1.0</div>
      </aside>
    </>
  );
}

export default Sidebar;
