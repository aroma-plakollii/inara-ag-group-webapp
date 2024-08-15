import axios from "axios";
import {API_URL} from "../config";
import {Passenger, PassengerPaged} from "../types/passenger";
import {PassengerForm} from "../types/passengerForm";
import {Booking, BookingPaged} from "../types/booking";

export const passengerGetAll = async (headers: any): Promise<Passenger[]> => {
    try {
        const res = await axios.get(`${API_URL}/passengers`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting passengers.');
    }
}

export const passengerGetAllPaged = async (page: number, headers: any): Promise<PassengerPaged> => {
    try {
        const res = await axios.get(`${API_URL}/passengers/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting passengers.');
    }
}

export const passengerGetSingle = async (idPassenger: number, headers: any): Promise<Passenger> => {
    try{
        const res = await axios(`${API_URL}/passengers/${idPassenger}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get passenger')
    }
}

export const passengerCreate = async (passengerData: Passenger, headers: any): Promise<Passenger> => {
    try {
        const res = await axios.post(`${API_URL}/passengers/create`, passengerData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create passengers.');
    }
}

export const passengerUpdate = async (idPassenger: number, passengerData: Passenger, headers: any): Promise<Passenger> => {
    try {
        const res = await axios.put(`${API_URL}/passengers/${idPassenger}`, passengerData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update passenger.');
    }
}

export const passengerDelete = async (idPassenger: number| undefined, headers: any): Promise<Passenger> => {
    try{
        const res = await axios.delete(`${API_URL}/passengers/${idPassenger}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete passenger')
    }
}

export const getCreateForm = async (headers: any): Promise<PassengerForm> => {
    try {
        const res = await axios.get<PassengerForm>(`${API_URL}/passengers/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting passenger create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<PassengerForm> => {
    try {
        const res = await axios.get<PassengerForm>(`${API_URL}/passengers/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting passenger update form.');
    }
}

export const searchPassenger = async (term: string | number, headers: any): Promise<Passenger> => {
    try {
        const res = await axios.get(`${API_URL}/passengers/search/${term}`, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to search passengers.');
    }
}

export const passengerGetByBooking = async (idBooking: number, headers: any): Promise<Passenger[]> => {
    try{
        const res = await axios(`${API_URL}/passengers/booking/${idBooking}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get passenger')
    }
}

export const passengerGetByBookingPaged = async (idBooking: number | undefined, data: any, headers: any): Promise<PassengerPaged> => {
    try{
        const res = await axios.post(`${API_URL}/passengers/booking/paged/${idBooking}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get passengers')
    }
}