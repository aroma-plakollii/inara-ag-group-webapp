import { AuthUser } from "./authUser";

export interface Auth {
    isAuthenticated: boolean;
    user: AuthUser | null;
    token: string | null;
    hasErrors: boolean | null;
    status: number;
}