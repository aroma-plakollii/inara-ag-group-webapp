import {Client} from "./client";

export interface Booking {
    idBooking?: number;
    carrier?: string;
    date?: Date;
    bookingNumber?: string;
    bookingDate?: Date;
    flightNumber?: string;
    departureDateTime?: Date;
    arrivalDateTime?: Date;
    duration?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    flightClass?: number;
    weight?: string;
    price?: number;
    isRoundTrip?: boolean;
    hasStop?: boolean;
    numberOfStops?: number;
    type?: string;
    returnDepartureDateTime?: Date;
    returnArrivalDateTime?: Date;
    returnDuration?: string;
    returnDepartureAirport?: string;
    returnArrivalAirport?: string;
    idClient?: Client;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookingPaged {
    bookings: Booking[],
    totalPages: number;
}