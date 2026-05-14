import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../services/tokenService";
import { login } from "../services/authService";
import { toast } from "react-toastify";

type LoginFormData = {
  email: string;
  password: string;
};

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  async function handleLogin(data: LoginFormData) {
    try {
      setLoading(true);

      const response = await login(data);

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

        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div className="mb-4">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="seu@email.com"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
            />

            {errors.email && (
              <p className="text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Senha</label>

            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              })}
            />

            {errors.password && (
              <p className="text-danger mt-1">{errors.password.message}</p>
            )}
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
