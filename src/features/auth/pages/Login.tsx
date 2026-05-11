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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="mb-4">EmployeeFlow</h1>

              <form onSubmit={handleLogin}>
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
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </form>

              <hr className="my-4" />

              <p className="text-center mb-0">
                Ainda não possui empresa?{" "}
                <Link to="/register">Criar conta</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
