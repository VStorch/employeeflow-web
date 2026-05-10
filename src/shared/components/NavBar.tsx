import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../features/auth/services/tokenService";
function NavBar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/employees">
          EmployeeFlow
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/employees">
            Funcionários
          </Link>
        </div>

        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
