import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaHome,
  FaSignOutAlt,
  FaLayerGroup,
} from "react-icons/fa";

import { removeToken } from "../../features/auth/services/tokenService";

function Sidebar() {
  const location = useLocation();

  const navigate = useNavigate();

  function handleLogout() {
    removeToken();

    navigate("/login");
  }

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },

    {
      label: "Funcionários",
      path: "/employees",
      icon: <FaUsers />,
    },

    {
      label: "Departamentos",
      path: "/departments",
      icon: <FaLayerGroup />,
    },

    {
      label: "Cargos",
      path: "/roles",
      icon: <FaBriefcase />,
    },

    {
      label: "Empresa",
      path: "/company",
      icon: <FaBuilding />,
    },
  ];

  return (
    <div
      className="sidebar d-flex flex-column flex-shrink-0 p-4 text-white"
      style={{
        width: "290px",
        minHeight: "100vh",
      }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-4 text-white text-decoration-none"
      >
        <span className="fs-4 fw-bold">EmployeeFlow</span>
      </Link>

      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center gap-2 ${
                  active ? "active" : "text-white"
                }`}
              >
                <span
                  style={{
                    fontSize: "1.1rem",
                  }}
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <hr />

      <button
        className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
        onClick={handleLogout}
      >
        <FaSignOutAlt />

        <span>Sair</span>
      </button>
    </div>
  );
}

export default Sidebar;
