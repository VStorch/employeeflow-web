import { Link } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="mb-4">EmployeeFlow</h1>

      <div className="row g-3">
        <div className="col-md-6">
          <Link to="/employees" className="text-decoration-none">
            <div className="card shadow-sm p-4">
              <h3>Funcionários</h3>

              <p className="text-muted mb-0">Gerencie funcionários</p>
            </div>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/company" className="text-decoration-none">
            <div className="card shadow-sm p-4">
              <h3>Empresa</h3>

              <p className="text-muted mb-0">Configurações da empresa</p>
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
