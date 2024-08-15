import axios from "axios";
import { API_URL } from "../config";
import { Auth } from "../types/auth";

const checkTokenMatch = async () => {
    let storedAuth: Auth | null;
    const storedData = sessionStorage.getItem('auth');
    storedAuth = storedData ? JSON.parse(storedData) : null;

    if (!storedAuth || !storedAuth.token) {
        console.error('No token found in sessionStorage');
        return false;
    }
    try {
        const response = await axios.post(`${API_URL}/validateToken`, { token: storedAuth.token });
        return response.data.isValid; // Assuming your API returns { isValid: boolean }
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
};
