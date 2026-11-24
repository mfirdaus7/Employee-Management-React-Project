import { Link } from "react-router-dom";

function Header({ onMenuClick, theme, onThemeChange, adminProfile }) {
  return (
    <header className="navbar bg-white border-bottom px-3 py-3 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center gap-2">
        {/* Menu and Title */}
        <div className="d-flex align-items-center gap-2 flex-grow-1 min-w-0">
          <button
            type="button"
            className="btn btn-outline-primary d-lg-none flex-shrink-0"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <i className="bi bi-list fs-4"></i>
          </button>

          <div className="header-title">
            <h5 className="fw-bold mb-0">Employee Management System</h5>
            <small className="text-secondary d-none d-md-block">
              Manage your workforce efficiently
            </small>
          </div>
        </div>

        {/* Theme Switch */}
        <div className="btn-group flex-shrink-0" role="group">
          <button
            type="button"
            className={`btn btn-sm ${
              theme === "light" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => onThemeChange("light")}
            aria-label="Light mode"
            title="Light Mode"
          >
            <i className="bi bi-sun"></i>
            <span className="d-none d-md-inline ms-1">Light</span>
          </button>

          <button
            type="button"
            className={`btn btn-sm ${
              theme === "dark" ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => onThemeChange("dark")}
            aria-label="Dark mode"
            title="Dark Mode"
          >
            <i className="bi bi-moon"></i>
            <span className="d-none d-md-inline ms-1">Dark</span>
          </button>
        </div>

        {/* Admin Profile - Click to Settings */}
        <Link
          to="/settings"
          className="text-decoration-none flex-shrink-0"
          title="Go to Settings"
          aria-label="Administrator Settings"
        >
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center"
              style={{ width: "42px", height: "42px" }}
            >
              {adminProfile.fullName.charAt(0).toUpperCase()}
            </div>

            <div className="d-none d-md-block">
              <strong className="d-block text-dark">
                {adminProfile.fullName}
              </strong>
              <small className="text-secondary">{adminProfile.position}</small>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
