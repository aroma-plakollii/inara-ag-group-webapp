import {Client} from "./client";
import {Invoice} from "./invoice";

export interface ClientInvoice {
    idClientInvoice?: number;
    description?: string;
    quantity?: number;
    price?: number;
    totalPrice?: number;
    idClient?: Client;
    idInvoice?: Invoice;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ClientInvoiceAdd {
    idClientInvoice?: number;
    description?: string;
    quantity?: number | string;
    price?: number | string;
    totalPrice?: number | string;
    idClient?: Client | string;
    idInvoice?: Invoice;
    errors: {
        description: boolean;
        quantity: boolean;
        price: boolean;
        totalPrice: boolean;
        idClient: boolean;
    }
    createdAt?: Date;
    updatedAt?: Date;
}