import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Passenger} from "../../types/passenger";

const initialState: Passenger[] = [];

const passengerSlice = createSlice({
    name: 'passengers',
    initialState,
    reducers: {
        setPassengers: (state, action: PayloadAction<Passenger[]>) => {
            return action.payload;
        },
    }
});

export const {setPassengers} = passengerSlice.actions;

export default passengerSlice.reducer;