import { useEffect } from "react";

import { useForm } from "react-hook-form";

import type { Role } from "../types/Role";

import type { RoleFormData } from "../types/RoleFormData";

type Props = {
  onSubmit: (data: RoleFormData) => Promise<void>;

  role?: Role | null;

  onCancel: () => void;
};

function RoleForm({ onSubmit, role, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>();

  useEffect(() => {
    if (role) {
      reset({
        name: role.name,
      });
    } else {
      reset({
        name: "",
      });
    }
  }, [role, reset]);

  async function submit(data: RoleFormData) {
    await onSubmit(data);

    if (!role) {
      reset({
        name: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="mb-4">{role ? "Editar Cargo" : "Novo Cargo"}</h2>

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
            {role ? "Atualizar" : "Salvar"}
          </button>

          {role && (
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

export default RoleForm;
