import api from "./api";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";
import { getToken } from "./tokenService";

export async function login(
    data: LoginRequest
): Promise<LoginResponse> {
    
    const response = await api.post("/auth/login", data);

    return response.data;
}

export function isAuthenticated(): boolean {
    return !!getToken();
}