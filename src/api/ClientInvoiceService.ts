import {Invoice} from "../types/invoice";
import axios from "axios";
import {API_URL} from "../config";
import {ClientInvoice, ClientInvoiceAdd} from "../types/clientInvoice";
import {ClientForm} from "../types/clientForm";
import {Client} from "../types/client";
import {InvoiceForm} from "../types/InvoiceForm";
import {Booking} from "../types/booking";

export const clientInvoiceGetAll = async (headers: any): Promise<ClientInvoice[]> => {
    try {
        const res = await axios.get(`${API_URL}/clientInvoices`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting client invoices.');
    }
}

export const clientInvoiceGetSingle = async (idClientInvoice: number, headers: any): Promise<ClientInvoice> => {
    try{
        const res = await axios(`${API_URL}/clientInvoices/${idClientInvoice}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get client invoice')
    }
}

export const clientInvoiceCreate = async (clientInvoiceData: ClientInvoice, headers: any): Promise<ClientInvoice> => {
    try {
        const res = await axios.post(`${API_URL}/clientInvoices/create`, clientInvoiceData, { headers });
        return res.data;
    }catch (error: any) {
        throw new Error('Failed to create client invoice.', error.response.data);
    }
}

export const clientInvoiceCreateAll = async (clientInvoiceData: ClientInvoiceAdd[], headers: any): Promise<ClientInvoice[]> => {
    try {
        const res = await axios.post(`${API_URL}/clientInvoices/create/all`, clientInvoiceData, { headers });
        return res.data;
    }catch (error: any) {
        throw new Error('Failed to create client invoice.', error.response.data);
    }
}

export const clientInvoiceUpdate = async (idClientInvoice: number, clientInvoiceData: ClientInvoice, headers: any): Promise<ClientInvoice> => {
    try {
        const res = await axios.put(`${API_URL}/clientInvoices/${idClientInvoice}`, clientInvoiceData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update client invoice.');
    }
}

export const clientInvoiceDelete = async (idClientInvoice: number| undefined, headers: any): Promise<ClientInvoice> => {
    try{
        const res = await axios.delete(`${API_URL}/clientInvoices/${idClientInvoice}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete client invoice')
    }
}

export const getCreateForm = async (headers: any): Promise<InvoiceForm> => {
    try {
        const res = await axios.get<InvoiceForm>(`${API_URL}/clientInvoices/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting client invoice create form.');
    }
}


export const getUpdateForm = async (headers: any): Promise<InvoiceForm> => {
    try {
        const res = await axios.get<InvoiceForm>(`${API_URL}/clientInvoices/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting client invoice update form.');
    }
}

export const clientInvoiceGetByClient = async (idClient: number, headers: any): Promise<ClientInvoice[]> => {
    try{
        const res = await axios(`${API_URL}/clientInvoices/client/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get Client Invoices')
    }
}