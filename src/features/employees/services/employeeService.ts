import api from "../../../api/api";
import type { Employee } from "../types/Employee";
import type { EmployeeFormData } from "../types/EmployeeFormData";

export async function createEmployee(
  data: EmployeeFormData
): Promise<void> {
  await api.post("/employees", data);
}

export async function getEmployees(): Promise<Employee[]> {
    const response = await api.get("/employees");
    return response.data;
}