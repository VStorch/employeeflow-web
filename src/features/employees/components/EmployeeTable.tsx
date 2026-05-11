import type { Employee } from "../types/Employee";

type Props = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
};

function EmployeeTable({ employees, onEdit, onDelete }: Props) {
  return (
    <table className="table table-striped mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Departamento</th>
          <th>Cargo</th>
          <th>Company Id</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.department}</td>
            <td>{employee.role}</td>
            <td>{employee.companyId}</td>

            <td className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(employee)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(employee.id)}
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

export default EmployeeTable;
