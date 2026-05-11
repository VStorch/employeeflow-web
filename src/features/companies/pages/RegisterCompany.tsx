import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createCompany } from "../services/companyService";
import { toast } from "react-toastify";

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

      toast.success("Empresa criada com sucesso!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao criar empresa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-5">
          <h1 className="auth-title">Criar Empresa</h1>

          <p className="auth-subtitle">Crie sua empresa no EmployeeFlow.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome da Empresa</label>

            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Senha</label>

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
  );
}

export default RegisterCompany;
