import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../services/employeeService";

import { getDepartments } from "../../departments/services/departmentService";

import { getRoles } from "../../roles/services/roleService";
import { useEffect, useState } from "react";
import type { Employee } from "../types/Employee";
import type { Department } from "../../departments/types/Department";
import type { Role } from "../../roles/types/Role";
import type { EmployeeFormData } from "../types/EmployeeFormData";
import MainLayout from "../../../layouts/MainLayout";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeCard from "../components/EmployeeCard";

function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>();
  const [selectedRoleId, setSelectedRoleId] = useState<number>();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [selectedDepartmentId, selectedRoleId]);

  async function loadInitialData() {
    try {
      const [employeesData, departmentsData, rolesData] = await Promise.all([
        getEmployees(),
        getDepartments(),
        getRoles(),
      ]);

      setEmployees(employeesData);

      setDepartments(departmentsData);

      setRoles(rolesData);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  }

  async function loadEmployees() {
    try {
      const data = await getEmployees(selectedDepartmentId, selectedRoleId);

      setEmployees(data);
    } catch (error) {
      console.error("Erro ao carregar funcionários", error);
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
    const confirmed = window.confirm("Deseja deletar este funcionário?");

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingEmployee(null);
  }

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-1">Funcionários</h1>

          <p className="text-muted mb-0">Gerencie os funcionários da empresa</p>
        </div>
      </div>

      <EmployeeForm
        onSubmit={handleSubmit}
        employee={editingEmployee}
        onCancel={handleCancelEdit}
      />

      <EmployeeFilters
        departments={departments}
        roles={roles}
        selectedDepartmentId={selectedDepartmentId}
        selectedRoleId={selectedRoleId}
        onDepartmentChange={setSelectedDepartmentId}
        onRoleChange={setSelectedRoleId}
      />

      {employees.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <h4>Nenhum funcionário encontrado</h4>

            <p className="text-muted mb-0">Tente ajustar os filtros</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Employees;
