import { useEffect, useState } from "react";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../services/roleService";
import type { Role } from "../types/Role";
import type { RoleFormData } from "../types/RoleFormData";
import MainLayout from "../../../layouts/MainLayout";
import RoleForm from "../components/RoleForm";
import RoleCard from "../components/RoleCard";

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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingRole(null);
  }

  return (
    <MainLayout>
      <div className="mb-4">
        <h1 className="mb-1">Cargos</h1>

        <p className="text-muted mb-0">Gerencie os cargos da empresa</p>
      </div>

      <RoleForm
        onSubmit={handleSubmit}
        role={editingRole}
        onCancel={handleCancelEdit}
      />

      {roles.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <h4>Nenhum cargo encontrado</h4>

            <p className="text-muted mb-0">Crie o primeiro cargo</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Roles;
