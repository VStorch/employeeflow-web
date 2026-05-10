import { getToken } from "./tokenService";

export function isAuthenticated(): boolean {
    return !!getToken();
}