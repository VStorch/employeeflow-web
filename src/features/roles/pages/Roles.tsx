import { useEffect, useState } from "react";

import MainLayout from "../../../layouts/MainLayout";

import RoleForm from "../components/RoleForm";

import RoleTable from "../components/RoleTable";

import type { Role } from "../types/Role";

import type { RoleFormData } from "../types/RoleFormData";

import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../services/roleService";

function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);

  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    loadRoles();
  }, []);

  async function loadRoles() {
    try {
      const data = await getRoles();

      setRoles(data);
    } catch (error) {
      console.error("Erro ao carregar cargos", error);
    }
  }

  async function handleSubmit(data: RoleFormData) {
    try {
      if (editingRole) {
        await updateRole(editingRole.id, data);

        setEditingRole(null);
      } else {
        await createRole(data);
      }

      await loadRoles();
    } catch (error) {
      console.error("Erro ao salvar cargo", error);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Deseja deletar este cargo?");

    if (!confirmed) return;

    try {
      await deleteRole(id);

      await loadRoles();
    } catch (error) {
      console.error("Erro ao deletar cargo", error);
    }
  }

  function handleEdit(role: Role) {
    setEditingRole(role);
  }

  function handleCancelEdit() {
    setEditingRole(null);
  }

  return (
    <MainLayout>
      <h1 className="mb-4">Cargos</h1>

      <RoleForm
        onSubmit={handleSubmit}
        role={editingRole}
        onCancel={handleCancelEdit}
      />

      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
    </MainLayout>
  );
}

export default Roles;
