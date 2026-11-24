import { useState } from "react";

function Settings({
  theme,
  onThemeChange,
  adminProfile,
  onProfileChange,
  preferences,
  onPreferencesChange,
}) {
  const [formData, setFormData] = useState(adminProfile);
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage({ text: "", type: "" });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fullName = formData.fullName.trim();
    const position = formData.position.trim();
    const email = formData.email.trim();

    if (!fullName || !position || !email) {
      setMessage({
        text: "Please fill in all profile fields.",
        type: "danger",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setMessage({
        text: "Please enter a valid email address.",
        type: "danger",
      });
      return;
    }

    const updatedProfile = {
      fullName,
      position,
      email,
    };

    onProfileChange(updatedProfile);

    localStorage.setItem("adminProfile", JSON.stringify(updatedProfile));

    setFormData(updatedProfile);
    setMessage({ text: "Profile updated successfully!", type: "success" });
  }

  function handleSavePreferences() {
    onPreferencesChange(preferences);

    setMessage({
      text: "System preferences saved successfully!",
      type: "success",
    });
  }

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Settings</h2>
        <p className="text-secondary mb-0">
          Manage your application preferences
        </p>
      </div>

      {/* Administrator Profile */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-person-circle me-2 text-primary"></i>
            Administrator Profile
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  name="position"
                  className="form-control"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4 d-flex align-items-center gap-3 flex-wrap">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-save me-2"></i>
                Save Profile
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setFormData(adminProfile);
                  setMessage("");
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Reset Changes
              </button>

              {message.text && (
                <span
                  className={`small ${
                    message.type === "error" ? "text-danger" : "text-success"
                  }`}
                >
                  {message.text}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* System Information */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4">
            <i className="bi bi-info-circle me-2 text-primary"></i>
            System Information
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-secondary">Application Name</small>
              <p className="fw-semibold mb-0">Employee Management System</p>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Version</small>
              <p className="fw-semibold mb-0">1.0.0</p>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Frontend</small>
              <p className="fw-semibold mb-0">React + Bootstrap</p>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Backend</small>
              <p className="fw-semibold mb-0">Node.js + Express</p>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Database</small>
              <p className="fw-semibold mb-0">PostgreSQL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">
            <i className="bi bi-palette me-2 text-primary"></i>
            Appearance
          </h5>

          <p className="text-secondary mb-3">
            Choose your preferred application theme.
          </p>

          <div className="d-flex gap-3 flex-wrap">
            <button
              type="button"
              className={`btn ${
                theme === "light" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => onThemeChange("light")}
            >
              <i className="bi bi-sun me-2"></i>
              Light Mode
            </button>

            <button
              type="button"
              className={`btn ${
                theme === "dark" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => onThemeChange("dark")}
            >
              <i className="bi bi-moon me-2"></i>
              Dark Mode
            </button>
          </div>

          <div className="mt-3">
            <span className="badge text-bg-secondary">
              Current Theme: {theme.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">
            <i className="bi bi-sliders me-2 text-primary"></i>
            System Preferences
          </h5>

          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Default Employee Status
              </label>

              <select
                className="form-select"
                value={preferences.defaultStatus}
                onChange={(event) =>
                  onPreferencesChange({
                    ...preferences,
                    defaultStatus: event.target.value,
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Employees Per Page
              </label>

              <select
                className="form-select"
                value={preferences.pageSize}
                onChange={(event) =>
                  onPreferencesChange({
                    ...preferences,
                    pageSize: Number(event.target.value),
                  })
                }
              >
                <option value="5">5 Employees</option>
                <option value="10">10 Employees</option>
                <option value="20">20 Employees</option>
                <option value="50">50 Employees</option>
              </select>
            </div>

            <div className="col-12">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="confirmDelete"
                  checked={preferences.confirmDelete}
                  onChange={(event) =>
                    onPreferencesChange({
                      ...preferences,
                      confirmDelete: event.target.checked,
                    })
                  }
                />

                <label className="form-check-label" htmlFor="confirmDelete">
                  Confirm before deleting an employee
                </label>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={handleSavePreferences}
          >
            <i className="bi bi-save me-2"></i>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
