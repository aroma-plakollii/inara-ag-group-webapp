import {Client} from "./client";
import {Invoice} from "./invoice";

export interface InvoiceForm {
    operation: string,
    clients: Client[];
}