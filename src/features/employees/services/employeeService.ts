import api from "../../../api/api";
import type { Employee } from "../types/Employee";
import type { EmployeeFormData } from "../types/EmployeeFormData";

export async function createEmployee(
  data: EmployeeFormData
): Promise<Employee> {
  const response = await api.post("/employees", data);
  return response.data;
}

export async function getEmployees(
  departmentId?: number,
  roleId?: number
): Promise<Employee[]> {
  const response = await api.get<Employee[]>("/employees", {
    params: { departmentId, roleId },
  });
  return response.data;
}

export async function getEmployeeById(id: number): Promise<Employee> {
  const response = await api.get<Employee>(`/employees/${id}`);
  return response.data;
}

export async function updateEmployee(
  id: number,
  data: EmployeeFormData
): Promise<Employee> {
  const response = await api.put<Employee>(`/employees/${id}`, data);
  return response.data;
}

export async function deleteEmployee(id: number): Promise<void> {
  await api.delete<void>(`/employees/${id}`);
}