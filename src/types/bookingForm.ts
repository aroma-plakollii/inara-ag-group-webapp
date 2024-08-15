import {Client} from "./client";

export interface BookingForm{
    operation: string,
    clients: Client[]
}