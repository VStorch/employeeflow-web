import api from "../../../api/api";

import type { Company } from "../types/Company";
import type { UpdateCompanyRequest } from "../types/UpdateCompanyRequest";
import type { CreateCompanyRequest } from "../types/CreateCompanyRequest";

export async function createCompany(
  data: CreateCompanyRequest
): Promise<Company> {
  const response = await api.post<Company>(
    "/companies",
    data
  );

  return response.data;
}

export async function getMyCompany(): Promise<Company> {
  const response = await api.get<Company>(
    "/companies/me"
  );

  return response.data;
}

export async function updateCompany(
  data: UpdateCompanyRequest
): Promise<Company> {
  const response = await api.put<Company>(
    "/companies",
    data
  );

  return response.data;
}

export async function deleteCompany(): Promise<void> {
  await api.delete("/companies");
}