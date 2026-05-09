import api from "./api";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";

export async function login(
    data: LoginRequest
): Promise<LoginResponse> {
    
    const response = await api.post("/auth/login", data);

    return response.data;
}