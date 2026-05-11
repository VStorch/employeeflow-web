import type { Company } from "../types/Company";

type Props = {
  company: Company;
  onEdit: () => void;
  onDelete: () => void;
};

function CompanyCard({ company, onEdit, onDelete }: Props) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">{company.name}</h2>

        <p className="text-muted">Company ID: {company.id}</p>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-primary" onClick={onEdit}>
            Editar
          </button>

          <button className="btn btn-danger" onClick={onDelete}>
            Excluir Empresa
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
