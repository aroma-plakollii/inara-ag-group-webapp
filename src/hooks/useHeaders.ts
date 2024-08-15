import {Auth} from "../types/auth";

export const useHeaders = () => {
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
    const token = sessionAuthData ? sessionAuthData.token : false;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    return headers;
}