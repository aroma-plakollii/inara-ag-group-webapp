import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import { Auth } from '../../types/auth';
import { User } from '../../types/user';

const initialState: Auth = {
    isAuthenticated: false,
    user: null,
    token: null,
    hasErrors: false,
    status: 0
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ 
            user: User; 
            token: string;
        }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
          },
          logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
          },
          setAuthData: (state, action: PayloadAction<Auth>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
          },
        setError: (state) => {
            state.hasErrors = true;
        },
        clearError: (state) => {
            state.hasErrors = false;
        }
    }
});

export const {login, logout, setAuthData, setError, clearError} = authSlice.actions;

export default authSlice.reducer;
