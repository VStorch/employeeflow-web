import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout";

import { createCompany } from "../services/companyService";

function RegisterCompany() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await createCompany({
        name,
        email,
        password,
      });

      alert("Empresa criada com sucesso!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert("Erro ao criar empresa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="mb-4">Criar Empresa</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Nome da Empresa</label>

                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label>Senha</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Criando..." : "Criar Empresa"}
                </button>
              </form>

              <hr className="my-4" />

              <p className="text-center mb-0">
                Já possui conta? <Link to="/login">Entrar</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default RegisterCompany;
