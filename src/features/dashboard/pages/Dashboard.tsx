import { useEffect, useState } from "react";
import { getEmployees } from "../../employees/services/employeeService";
import { getDepartments } from "../../departments/services/departmentService";
import { getRoles } from "../../roles/services/roleService";
import { FaArrowRight, FaBriefcase, FaBuilding, FaUsers } from "react-icons/fa";
import MainLayout from "../../../layouts/MainLayout";
import { Link } from "react-router-dom";

function Dashboard() {
  const [employeesCount, setEmployeesCount] = useState(0);

  const [departmentsCount, setDepartmentsCount] = useState(0);

  const [rolesCount, setRolesCount] = useState(0);

  useEffect(() => {
    loadMetrics();
  }, []);

  async function loadMetrics() {
    try {
      const [employees, departments, roles] = await Promise.all([
        getEmployees(),
        getDepartments(),
        getRoles(),
      ]);

      setEmployeesCount(employees.length);

      setDepartmentsCount(departments.length);

      setRolesCount(roles.length);
    } catch (error) {
      console.error("Erro ao carregar dashboard", error);
    }
  }

  const metricCards = [
    {
      title: "Funcionários",
      value: employeesCount,
      icon: <FaUsers />,
      path: "/employees",
    },

    {
      title: "Departamentos",
      value: departmentsCount,
      icon: <FaBuilding />,
      path: "/departments",
    },

    {
      title: "Cargos",
      value: rolesCount,
      icon: <FaBriefcase />,
      path: "/roles",
    },
  ];

  const quickLinks = [
    {
      title: "Empresa",
      description: "Configurações da empresa",
      path: "/company",
    },

    {
      title: "Gerenciar Funcionários",
      description: "Visualize e organize funcionários",
      path: "/employees",
    },

    {
      title: "Gerenciar Departamentos",
      description: "Controle os departamentos",
      path: "/departments",
    },

    {
      title: "Gerenciar Cargos",
      description: "Controle os cargos da empresa",
      path: "/roles",
    },
  ];

  return (
    <MainLayout>
      <div className="mb-5">
        <h1 className="mb-1">Dashboard</h1>

        <p className="text-muted mb-0">Visão geral da empresa</p>
      </div>

      <div className="row g-4 mb-5">
        {metricCards.map((card) => (
          <div key={card.title} className="col-md-4">
            <Link to={card.path} className="text-decoration-none">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-2">{card.title}</p>

                      <h2 className="mb-0">{card.value}</h2>
                    </div>

                    <div className="fs-1 text-primary">{card.icon}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3>Acesso rápido</h3>
      </div>

      <div className="row g-4">
        {quickLinks.map((link) => (
          <div key={link.title} className="col-md-6">
            <Link to={link.path} className="text-decoration-none">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h4 className="mb-2 text-dark">{link.title}</h4>

                      <p className="text-muted mb-0">{link.description}</p>
                    </div>

                    <FaArrowRight className="text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
