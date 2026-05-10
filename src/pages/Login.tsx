import { useState } from "react";
import { login } from "../services/authService";
import { saveToken } from "../services/tokenService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      saveToken(response.token);

      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Erro no login");
    }
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>

          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Senha</label>

          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
