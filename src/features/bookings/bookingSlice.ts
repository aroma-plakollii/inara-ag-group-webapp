import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Booking} from "../../types/booking";

const initialState: Booking[] = [];

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<Booking[]>) => {
            return action.payload;
        },
    }
});

export const {setBookings} = bookingSlice.actions;

export default bookingSlice.reducer;