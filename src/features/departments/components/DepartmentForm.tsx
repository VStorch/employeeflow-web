import { useEffect } from "react";

import { useForm } from "react-hook-form";

import type { Department } from "../types/Department";

import type { DepartmentFormData } from "../types/DepartmentFormData";

type Props = {
  onSubmit: (data: DepartmentFormData) => Promise<void>;

  department?: Department | null;

  onCancel: () => void;
};

function DepartmentForm({ onSubmit, department, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormData>();

  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [department, reset]);

  async function submit(data: DepartmentFormData) {
    await onSubmit(data);

    if (!department) {
      reset({
        name: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="mb-4">
          {department ? "Editar Departamento" : "Novo Departamento"}
        </h2>

        <div className="mb-3">
          <label>Nome</label>

          <input
            className="form-control"
            {...register("name", {
              required: "Nome é obrigatório",
            })}
          />

          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary">
            {department ? "Atualizar" : "Salvar"}
          </button>

          {department && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default DepartmentForm;
