import type { Department } from "../types/Department";

type Props = {
  department: Department;

  onEdit: (department: Department) => void;

  onDelete: (id: number) => void;
};

function DepartmentCard({ department, onEdit, onDelete }: Props) {
  return (
    <div className="col-md-6 col-xl-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            <h4 className="card-title">{department.name}</h4>

            <p className="text-muted mb-0">
              ID do Departmento: {department.id}
            </p>
          </div>

          <div className="mt-auto">
            <div className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm flex-fill"
                onClick={() => onEdit(department)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm flex-fill"
                onClick={() => onDelete(department.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentCard;
