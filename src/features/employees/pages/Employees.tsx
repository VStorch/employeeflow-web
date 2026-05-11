import { useEffect, useState } from "react";

import MainLayout from "../../../layouts/MainLayout";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

import type { Employee } from "../types/Employee";
import type { EmployeeFormData } from "../types/EmployeeFormData";

import { getEmployees, createEmployee } from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  }

  async function handleCreateEmployee(data: EmployeeFormData) {
    try {
      await createEmployee(data);

      await loadEmployees();
    } catch (error) {
      console.error("Erro ao criar funcionário", error);
    }
  }

  return (
    <MainLayout>
      <h1>Funcionários</h1>

      <EmployeeForm onSubmit={handleCreateEmployee} />

      <EmployeeTable employees={employees} />
    </MainLayout>
  );
}

export default Employees;
