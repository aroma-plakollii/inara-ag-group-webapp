import axios from "axios";
import {API_URL} from "../config";
import {Booking, BookingPaged} from "../types/booking";
import {BookingForm} from "../types/bookingForm";
import {Passenger} from "../types/passenger";

export const bookingGetAll = async (headers: any): Promise<Booking[]> => {
    try {
        const res = await axios.get(`${API_URL}/bookings`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting bookings.');
    }
}

export const bookingGetAllPaged = async (page: number, headers: any): Promise<BookingPaged> => {
    try {
        const res = await axios.get(`${API_URL}/bookings/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting bookings.');
    }
}

export const bookingGetSingle = async (idBooking: number, headers: any): Promise<Booking> => {
    try{
        const res = await axios(`${API_URL}/bookings/${idBooking}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get booking')
    }
}

export const bookingCreate = async (bookingData: Booking, headers: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/bookings/create`, bookingData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create booking.');
    }
}

export const bookingUpdate = async (idBooking: number, bookingData: Booking, headers: any): Promise<Booking> => {
    try {
        const res = await axios.put(`${API_URL}/bookings/${idBooking}`, bookingData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update booking.');
    }
}

export const bookingDelete = async (idBooking: number| undefined, headers: any): Promise<Booking> => {
    try{
        const res = await axios.delete(`${API_URL}/bookings/${idBooking}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete booking')
    }
}

export const getCreateForm = async (headers: any): Promise<BookingForm> => {
    try {
        const res = await axios.get<BookingForm>(`${API_URL}/bookings/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting booking create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<BookingForm> => {
    try {
        const res = await axios.get<BookingForm>(`${API_URL}/bookings/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting booking update form.');
    }
}

export const bookingGetByClient = async (idClient: number, headers: any): Promise<Booking[]> => {
    try{
        const res = await axios(`${API_URL}/bookings/client/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get bookings')
    }
}

export const bookingGetByClientPaged = async (idClient: number | undefined, data: any, headers: any): Promise<BookingPaged> => {
    try{
        const res = await axios.post(`${API_URL}/bookings/client/paged/${idClient}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get bookings')
    }
}

export const searchBooking = async (term: string | number, headers: any): Promise<Booking[]> => {
    try {
        const res = await axios.get(`${API_URL}/bookings/search/${term}`, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to search booking.');
    }
}