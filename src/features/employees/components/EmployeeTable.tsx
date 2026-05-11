import type { Employee } from "../types/Employee";

type Props = {
  employees: Employee[];
};

function EmployeeTable({ employees }: Props) {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
