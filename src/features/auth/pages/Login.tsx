import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService";

import { saveToken } from "../services/tokenService";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      saveToken(response.token);

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Erro no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center mb-5">
          <h1 className="auth-title">EmployeeFlow</h1>

          <p className="auth-subtitle">
            Gerencie sua empresa com simplicidade.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Senha</label>

            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <p className="text-center mb-0 text-muted">
          Ainda não possui empresa? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
