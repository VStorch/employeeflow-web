import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createCompany } from "../services/companyService";
import { toast } from "react-toastify";

type RegisterCompanyFormData = {
  name: string;
  email: string;
  password: string;
};

function RegisterCompany() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCompanyFormData>();

  async function handleRegister(data: RegisterCompanyFormData) {
    try {
      setLoading(true);

      await createCompany(data);

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

        <form onSubmit={handleSubmit(handleRegister)} noValidate>
          <div className="mb-3">
            <label className="form-label">Nome da Empresa</label>

            <input
              className="form-control"
              placeholder="Digite o nome da empresa"
              {...register("name", {
                required: "Nome da empresa é obrigatório",
                minLength: {
                  value: 3,
                  message: "O nome deve ter no mínimo 3 caracteres",
                },
              })}
            />

            {errors.name && (
              <p className="text-danger mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="empresa@email.com"
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
