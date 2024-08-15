import axios from "axios";
import { API_URL } from "../config";
import {Invoice, InvoicePaged} from "../types/invoice";
import {InvoiceForm} from "../types/InvoiceForm";
import {ClientInvoice} from "../types/clientInvoice";
import {ClientPaged} from "../types/client";
import {BookingPaged} from "../types/booking";

export const invoiceGetAll = async (headers: any): Promise<Invoice[]> => {
    try {
        const res = await axios.get(`${API_URL}/invoices`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting invoices.');
    }
}

export const invoiceGetAllPaged = async (page: number, headers: any): Promise<InvoicePaged> => {
    try {
        const res = await axios.get(`${API_URL}/invoices/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting invoices.');
    }
}

export const invoiceGetSingle = async (idInvoice: number, headers: any): Promise<Invoice> => {
    try{
        const res = await axios(`${API_URL}/invoices/${idInvoice}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get invoice')
    }
}

export const invoiceCreate = async (invoiceData: Invoice, headers: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/invoices/create`, invoiceData, { headers });
        return res.data;
    }catch (error: any) {
        throw new Error('Failed to create invoice.', error.response.data);
    }
}

export const invoiceUpdate = async (idInvoice: number, invoiceData: Invoice, headers: any): Promise<Invoice> => {
    try {
        const res = await axios.put(`${API_URL}/invoices/${idInvoice}`, invoiceData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update invoice.');
    }
}

export const invoiceDelete = async (idInvoice: number| undefined, headers: any): Promise<Invoice> => {
    try{
        const res = await axios.delete(`${API_URL}/invoices/${idInvoice}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete invoice')
    }
}

export const getCreateForm = async (headers: any): Promise<InvoiceForm> => {
    try {
        const res = await axios.get<InvoiceForm>(`${API_URL}/invoices/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting invoice create form.');
    }
}


export const getUpdateForm = async (headers: any): Promise<InvoiceForm> => {
    try {
        const res = await axios.get<InvoiceForm>(`${API_URL}/invoices/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting invoice update form.');
    }
}

export const invoiceGetByClient = async (idClient: number, headers: any): Promise<Invoice[]> => {
    try{
        const res = await axios(`${API_URL}/invoices/client/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get invoices')
    }
}

export const invoiceGetByClientPaged = async (idClient: number | undefined, data: any, headers: any): Promise<InvoicePaged> => {
    try{
        const res = await axios.post(`${API_URL}/invoices/client/paged/${idClient}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get invoices')
    }
}
