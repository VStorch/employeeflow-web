import type { Role } from "../types/Role";

type Props = {
  roles: Role[];

  onEdit: (role: Role) => void;

  onDelete: (id: number) => void;
};

function RoleTable({ roles, onEdit, onDelete }: Props) {
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
        {roles.map((role) => (
          <tr key={role.id}>
            <td>{role.id}</td>

            <td>{role.name}</td>

            <td>{role.companyId}</td>

            <td className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(role)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(role.id)}
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

export default RoleTable;
