import type { Employee } from "../types/Employee";

type Props = {
  employee: Employee;

  onEdit: (employee: Employee) => void;

  onDelete: (id: number) => void;
};

function EmployeeCard({ employee, onEdit, onDelete }: Props) {
  return (
    <div className="col-md-6 col-xl-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            <h4 className="card-title mb-1">{employee.name}</h4>

            <p className="text-muted mb-0">{employee.email}</p>
          </div>

          <div className="mb-3">
            <span className="badge bg-primary me-2">{employee.department}</span>

            <span className="badge bg-dark">{employee.role}</span>
          </div>

          <div className="mt-auto">
            <small className="text-muted">
              ID do Funcionário: {employee.id}
            </small>

            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-warning btn-sm flex-fill"
                onClick={() => onEdit(employee)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm flex-fill"
                onClick={() => onDelete(employee.id)}
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

export default EmployeeCard;
