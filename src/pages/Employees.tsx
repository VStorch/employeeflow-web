import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import { getEmployees } from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Erro ao buscar funcionários", error);
      }
    }

    loadEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Funcionários</h1>

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
    </div>
  );
}

export default Employees;