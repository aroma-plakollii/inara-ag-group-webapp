import {User} from "./user";
import {Booking} from "./booking";

export interface Client {
    idClient?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: Date;
    nationalId?: string;
    passportId?: string;
    country?: string;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ClientPaged {
    clients: Client[],
    totalPages: number;
}