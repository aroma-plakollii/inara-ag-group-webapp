import { configureStore} from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import userSlice from '../features/users/userSlice';
import clientSlice from "../features/clients/clientSlice";
import userTypeSlice from "../features/userTypes/userTypeSlice";
import bookingSlice from "../features/bookings/bookingSlice";
import passengerSlice from "../features/passengers/passengerSlice";
import invoiceSlice from "../features/invoices/invoiceSlice";
import ClientInvoiceSlice from "../features/clientInvoices/clientInvoiceSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: userSlice,
        clients: clientSlice,
        userTypes: userTypeSlice,
        bookings: bookingSlice,
        passengers: passengerSlice,
        invoices: invoiceSlice,
        clientInvoices: ClientInvoiceSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch