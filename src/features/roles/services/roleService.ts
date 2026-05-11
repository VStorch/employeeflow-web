import api from "../../../api/api";

import type { Role } from "../types/Role";

import type { RoleFormData } from "../types/RoleFormData";

export async function getRoles(): Promise<
  Role[]
> {
  const response =
    await api.get<Role[]>("/roles");

  return response.data;
}

export async function createRole(
  data: RoleFormData
): Promise<Role> {
  const response = await api.post<Role>(
    "/roles",
    data
  );

  return response.data;
}

export async function updateRole(
  id: number,
  data: RoleFormData
): Promise<Role> {
  const response = await api.put<Role>(
    `/roles/${id}`,
    data
  );

  return response.data;
}

export async function deleteRole(
  id: number
): Promise<void> {
  await api.delete(`/roles/${id}`);
}