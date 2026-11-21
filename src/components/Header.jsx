function Header() {
  return (
    <header className="header">
      <div>
        <h2>Employee Management System</h2>
        <p>Manage your workforce efficiently</p>
      </div>

      <div className="header-user">
        <div className="user-avatar">F</div>

        <div>
          <strong>Administrator</strong>
          <p>System Admin</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
