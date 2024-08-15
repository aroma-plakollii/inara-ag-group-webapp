import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import { User } from '../../types/user';

const initialState: User[] = [];

const userSlice = createSlice({
    name: 'users', 
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            return action.payload;
        },
    }
});

export const {setUsers} = userSlice.actions;

export default userSlice.reducer;

