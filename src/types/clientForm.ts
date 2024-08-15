import {User} from "./user";

export interface ClientForm {
    operation: string,
    users: User[]
}