import api from "../../../api/api";

import type { Department } from "../types/Department";

import type { DepartmentFormData } from "../types/DepartmentFormData";

export async function getDepartments(): Promise<
  Department[]
> {
  const response = await api.get<
    Department[]
  >("/departments");

  return response.data;
}

export async function createDepartment(
  data: DepartmentFormData
): Promise<Department> {
  const response = await api.post<
    Department
  >("/departments", data);

  return response.data;
}

export async function updateDepartment(
  id: number,
  data: DepartmentFormData
): Promise<Department> {
  const response = await api.put<
    Department
  >(`/departments/${id}`, data);

  return response.data;
}

export async function deleteDepartment(
  id: number
): Promise<void> {
  await api.delete(`/departments/${id}`);
}