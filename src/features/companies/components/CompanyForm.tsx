import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Company } from "../types/Company";
import type { UpdateCompanyRequest } from "../types/UpdateCompanyRequest";

type Props = {
  company: Company;
  onSubmit: (data: UpdateCompanyRequest) => Promise<void>;
  onCancel: () => void;
};

function CompanyForm({ company, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCompanyRequest>();

  useEffect(() => {
    reset({
      name: company.name,
    });
  }, [company, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card shadow-sm">
      <div className="card-body">
        <h2 className="mb-4">Editar Empresa</h2>

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
          <button className="btn btn-primary">Salvar</button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}

export default CompanyForm;
