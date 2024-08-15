import { UserType } from "./userType";

export interface UserForm {
    operation: string,
    userRoles: {
        SUPERADMIN: string,
        ADMIN: string,
        AGENT: string
    }
}