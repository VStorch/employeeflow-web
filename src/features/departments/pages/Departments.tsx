import { useEffect, useState } from "react";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from "../services/departmentService";
import type { Department } from "../types/Department";
import type { DepartmentFormData } from "../types/DepartmentFormData";
import MainLayout from "../../../layouts/MainLayout";
import DepartmentForm from "../components/DepartmentForm";
import DepartmentCard from "../components/DepartmentCard";

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingDepartment(null);
  }

  return (
    <MainLayout>
      <div className="mb-4">
        <h1 className="mb-1">Departamentos</h1>

        <p className="text-muted mb-0">Gerencie os departamentos da empresa</p>
      </div>

      <DepartmentForm
        onSubmit={handleSubmit}
        department={editingDepartment}
        onCancel={handleCancelEdit}
      />

      {departments.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <h4>Nenhum departamento encontrado</h4>

            <p className="text-muted mb-0">Crie o primeiro departamento</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {departments.map((department) => (
            <DepartmentCard
              key={department.id}
              department={department}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Departments;
