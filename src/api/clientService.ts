import axios from "axios";
import { API_URL } from "../config";
import {getHeaders} from "../helpers/getHeaders";
import {Client, ClientPaged} from "../types/client";
import {ClientForm} from "../types/clientForm";
import {BookingPaged} from "../types/booking";

export const clientGetAll = async (headers: any): Promise<Client[]> => {
    try {
        const res = await axios.get(`${API_URL}/clients`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting clients.');
    }
}

export const clientGetAllPaged = async (page: number, headers: any): Promise<ClientPaged> => {
    try {
        const res = await axios.get(`${API_URL}/clients/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting clients.');
    }
}

export const clientGetSingle = async (idClient: number, headers: any): Promise<Client> => {
    try{
        const res = await axios(`${API_URL}/clients/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get client')
    }
}

export const clientCreate = async (clientData: Client, headers: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/clients/create`, clientData, { headers });
        return res.data;
    }catch (error: any) {
        if (error.response) {
            console.error("Error data:", error.response.data);
            return error.response.data;
        }
        throw new Error('Failed to create client.', error.response.data);
    }
}

export const clientUpdate = async (idClient: number, clientData: Client, headers: any): Promise<Client> => {
    try {
        const res = await axios.put(`${API_URL}/clients/${idClient}`, clientData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update client.');
    }
}

export const clientDelete = async (idClient: number| undefined, headers: any): Promise<Client> => {
    try{
        const res = await axios.delete(`${API_URL}/clients/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete client')
    }
}

export const getCreateForm = async (headers: any): Promise<ClientForm> => {
    try {
        const res = await axios.get<ClientForm>(`${API_URL}/clients/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting client create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<ClientForm> => {
    try {
        const res = await axios.get<ClientForm>(`${API_URL}/clients/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting client update form.');
    }
}

export const searchClients = async (term: string | number, headers: any): Promise<Client[]> => {
    try {
        const res = await axios.get(`${API_URL}/clients/search/${term}`, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to search clients.');
    }
}