import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {ClientInvoice} from "../../types/clientInvoice";

const initialState: ClientInvoice[] = [];

const clientInvoiceSlice = createSlice({
    name: 'clientInvoices',
    initialState,
    reducers: {
        setClientInvoices: (state, action: PayloadAction<ClientInvoice[]>) => {
            return action.payload;
        },
    }
});

export const {setClientInvoices} = clientInvoiceSlice.actions;

export default clientInvoiceSlice.reducer;