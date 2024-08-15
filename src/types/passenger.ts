import {Booking} from "./booking";
import {Invoice} from "./invoice";

export interface Passenger {
    idPassenger?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: Date;
    nationalId?: string;
    country?: string;
    idBooking?: Booking;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PassengerPaged {
    passengers: Passenger[],
    totalPages: number;
}