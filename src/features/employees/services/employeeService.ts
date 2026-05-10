import api from "../../../api/api";
import type { Employee } from "../types/Employee";


export async function getEmployees(): Promise<Employee[]> {
    const response = await api.get("/employees");
    return response.data;
}