import {Client} from "./client";
import {Booking} from "./booking";

export interface BookingDestination {
    idBookingDestination?: number;
    startDestination?: string;
    endDestination?: string;
    startDateTime: Date | string;
    endDateTime: Date | string;
    duration: string;
    waitingTime: string;
    idBooking: Booking;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookingDestinationAdd {
    idBookingDestination?: number;
    startDestination?: string;
    endDestination?: string;
    startDateTime: Date | string;
    endDateTime: Date | string;
    duration: string;
    waitingTime: string;
    idBooking: Booking;
    errors: {
        startDestination: boolean,
        endDestination: boolean,
        startDateTime: boolean,
        endDateTime: boolean,
    }
}

export interface BookingDestinationPaged {
    bookingDestinations: BookingDestination[],
    totalPages: number;
}