import { UserType } from "./userType";
import {Client} from "./client";

export interface User {
    idUser?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    userRole?: string
}

export interface UserPaged {
    users: User[],
    totalPages: number;
}