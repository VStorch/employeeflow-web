import type { Department } from "../types/Department";

type Props = {
  departments: Department[];

  onEdit: (department: Department) => void;

  onDelete: (id: number) => void;
};

function DepartmentTable({ departments, onEdit, onDelete }: Props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>

          <th>Nome</th>

          <th>Company ID</th>

          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {departments.map((department) => (
          <tr key={department.id}>
            <td>{department.id}</td>

            <td>{department.name}</td>

            <td>{department.companyId}</td>

            <td className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(department)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(department.id)}
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentTable;
