import {Client} from "./client";

export interface Invoice {
    idInvoice?: number;
    invoiceNumber?: string;
    date?: Date;
    description?: string;
    quantity?: number;
    price?: number;
    totalPrice?: number;
    idClient?: Client;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvoicePaged {
    invoices: Invoice[],
    totalPages: number;
}