import { useEffect, useState } from "react";

import MainLayout from "../../../layouts/MainLayout";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

import type { Employee } from "../types/Employee";
import type { EmployeeFormData } from "../types/EmployeeFormData";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

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

  async function handleSubmit(data: EmployeeFormData) {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, data);
        setEditingEmployee(null);
      } else {
        await createEmployee(data);
      }

      await loadEmployees();
    } catch (error) {
      console.error("Erro ao salvar funcionário", error);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Tem certeza que deseja deletar este funcionário?",
    );

    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      await loadEmployees();
    } catch (error) {
      console.error("Erro ao deletar funcionário", error);
    }
  }

  function handleEdit(employee: Employee) {
    setEditingEmployee(employee);
  }

  function handleCancelEdit() {
    setEditingEmployee(null);
  }

  return (
    <MainLayout>
      <h1 className="mb-4">Funcionários</h1>

      <EmployeeForm
        onSubmit={handleSubmit}
        employee={editingEmployee}
        onCancel={handleCancelEdit}
      />

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

export default Employees;
