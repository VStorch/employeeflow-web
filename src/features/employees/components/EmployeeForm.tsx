import { useForm } from "react-hook-form";
import type { EmployeeFormData } from "../types/EmployeeFormData";

type Props = {
  onSubmit: (data: EmployeeFormData) => void;
};

function EmployeeForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label>Name</label>

        <input
          className="form-control"
          {...register("name", {
            required: "Nome é obrigatório",
          })}
        />

        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label>Email</label>

        <input
          className="form-control"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email inválido",
            },
          })}
        />

        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label>Department Id</label>

        <input
          type="number"
          className="form-control"
          {...register("departmentId", {
            required: "Departamento é obrigatório",
            valueAsNumber: true,
          })}
        />

        {errors.departmentId && (
          <p className="text-danger">{errors.departmentId.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>Role Id</label>

        <input
          type="number"
          className="form-control"
          {...register("roleId", {
            required: "Cargo é obrigatório",
            valueAsNumber: true,
          })}
        />

        {errors.roleId && (
          <p className="text-danger">{errors.roleId.message}</p>
        )}
      </div>

      <button className="btn btn-primary">Salvar</button>
    </form>
  );
}

export default EmployeeForm;
