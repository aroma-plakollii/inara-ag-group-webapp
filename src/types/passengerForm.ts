import {Booking} from "./booking";

export interface PassengerForm {
    operation: string,
    bookings: Booking[]
}