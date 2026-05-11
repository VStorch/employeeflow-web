import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Employee } from "../types/Employee";
import type { EmployeeFormData } from "../types/EmployeeFormData";

type Props = {
  onSubmit: (data: EmployeeFormData) => void;
  employee?: Employee | null;
  onCancel: () => void;
};

function EmployeeForm({ onSubmit, employee, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>();

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        departmentId: employee.departmentId,
        roleId: employee.roleId,
      });
    } else {
      reset({
        name: "",
        email: "",
        departmentId: 0,
        roleId: 0,
      });
    }
  }, [employee, reset]);

  function submit(data: EmployeeFormData) {
    onSubmit(data);

    if (!employee) {
      reset({
        name: "",
        email: "",
        departmentId: 0,
        roleId: 0,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-4">
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

      <div className="d-flex gap-2">
        <button className="btn btn-primary">
          {employee ? "Atualizar" : "Salvar"}
        </button>

        {employee && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
