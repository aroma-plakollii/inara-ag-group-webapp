import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {UserType} from "../../types/userType";

const initialState: UserType[] = [];

const userTypeSlice = createSlice({
    name: 'userTypes',
    initialState,
    reducers: {
        setUserTypes: (state, action: PayloadAction<UserType[]>) => {
            return action.payload;
        },
    }
});

export const {setUserTypes} = userTypeSlice.actions;

export default userTypeSlice.reducer;