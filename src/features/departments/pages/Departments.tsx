import { useEffect, useState } from "react";

import MainLayout from "../../../layouts/MainLayout";

import DepartmentForm from "../components/DepartmentForm";

import DepartmentTable from "../components/DepartmentTable";

import type { Department } from "../types/Department";

import type { DepartmentFormData } from "../types/DepartmentFormData";

import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../services/departmentService";

function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );

  useEffect(() => {
    loadDepartments();
  }, []);

  async function loadDepartments() {
    try {
      const data = await getDepartments();

      setDepartments(data);
    } catch (error) {
      console.error("Erro ao carregar departamentos", error);
    }
  }

  async function handleSubmit(data: DepartmentFormData) {
    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, data);

        setEditingDepartment(null);
      } else {
        await createDepartment(data);
      }

      await loadDepartments();
    } catch (error) {
      console.error("Erro ao salvar departamento", error);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Deseja deletar este departamento?");

    if (!confirmed) return;

    try {
      await deleteDepartment(id);

      await loadDepartments();
    } catch (error) {
      console.error("Erro ao deletar departamento", error);
    }
  }

  function handleEdit(department: Department) {
    setEditingDepartment(department);
  }

  function handleCancelEdit() {
    setEditingDepartment(null);
  }

  return (
    <MainLayout>
      <h1 className="mb-4">Departamentos</h1>

      <DepartmentForm
        onSubmit={handleSubmit}
        department={editingDepartment}
        onCancel={handleCancelEdit}
      />

      <DepartmentTable
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </MainLayout>
  );
}

export default Departments;
