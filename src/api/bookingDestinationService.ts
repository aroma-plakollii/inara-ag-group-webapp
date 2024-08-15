import axios from "axios";
import {API_URL} from "../config";
import {Booking, BookingPaged} from "../types/booking";
import {BookingForm} from "../types/bookingForm";
import {Passenger} from "../types/passenger";
import {BookingDestination, BookingDestinationPaged} from "../types/bookingDestination";
import {BookingDestinationForm} from "../types/bookingDestinationForm";
import {ClientInvoice, ClientInvoiceAdd} from "../types/clientInvoice";

export const bookingDestinationGetAll = async (headers: any): Promise<any> => {
    try {
        const res = await axios.get(`${API_URL}/bookingDestinations`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting booking destinations');
    }
}

export const bookingDestinationGetAllPaged = async (page: number, headers: any): Promise<BookingDestinationPaged> => {
    try {
        const res = await axios.get(`${API_URL}/bookingDestinations/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting booking destinations');
    }
}

export const bookingDestinationGetSingle = async (idBookingDestination: number, headers: any): Promise<BookingDestination> => {
    try{
        const res = await axios(`${API_URL}/bookingDestinations/${idBookingDestination}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get booking destination')
    }
}

export const bookingDestinationCreate = async (bookingDestinationData: Booking, headers: any): Promise<BookingDestination> => {
    try {
        const res = await axios.post(`${API_URL}/bookingDestinations/create`, bookingDestinationData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create booking destination.');
    }
}

export const bookingDestinationCreateAll = async (bookingDestinationData: BookingDestination[], headers: any): Promise<BookingDestination[]> => {
    try {
        const res = await axios.post(`${API_URL}/bookingDestinations/create/all`, bookingDestinationData, { headers });
        return res.data;
    }catch (error: any) {
        throw new Error('Failed to create booking destination.', error.response.data);
    }
}

export const bookingDestinationUpdate = async (idBookingDestination: number, bookingDestinationData: BookingDestination, headers: any): Promise<BookingDestination> => {
    try {
        const res = await axios.put(`${API_URL}/bookingDestinations/${idBookingDestination}`, bookingDestinationData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update booking destination.');
    }
}

export const bookingDestinationDelete = async (idBookingDestination: number| undefined, headers: any): Promise<BookingDestination> => {
    try{
        const res = await axios.delete(`${API_URL}/bookingDestinations/${idBookingDestination}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete booking destination')
    }
}

export const getCreateForm = async (headers: any): Promise<BookingDestinationForm> => {
    try {
        const res = await axios.get<BookingDestinationForm>(`${API_URL}/bookingDestinations/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting booking destination create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<BookingDestinationForm> => {
    try {
        const res = await axios.get<BookingDestinationForm>(`${API_URL}/bookingDestinations/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting booking destination update form.');
    }
}

export const bookingDestinationGetByBooking = async (idBooking: number, headers: any): Promise<any> => {
    try{
        const res = await axios(`${API_URL}/bookingDestinations/booking/${idBooking}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get booking destinations')
    }
}

export const bookingDestinationGetByBookingPaged = async (idBooking: number | undefined, data: any, headers: any): Promise<BookingDestinationPaged> => {
    try{
        const res = await axios.post(`${API_URL}/bookingDestinations/booking/paged/${idBooking}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get booking destinations')
    }
}
