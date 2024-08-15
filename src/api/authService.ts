import { useDispatch } from "react-redux";
import { API_URL } from "../config";
import { Auth } from "../types/auth";
import { LoginCredentials } from "../types/loginCredentials";
import axios from 'axios';

const userString = sessionStorage.getItem('auth') ?? '';

const user = userString ? JSON.parse(userString) : null;

export const userType = user ? user.user.userRole : null;


export const loginUser = async (credentials: LoginCredentials): Promise<Auth> => {
    let storedAuth: Auth | null;
    const storedData = sessionStorage.getItem('auth');
    storedAuth = storedData ? JSON.parse(storedData) : null;

    if(storedAuth){
      return storedAuth;
    }

    try {
        const res = await axios.post<Auth>(`${API_URL}/login`, credentials)

        if (res.data.isAuthenticated) sessionStorage.setItem('auth', JSON.stringify(res.data));

        return res.data;
      } catch (error) {
        throw new Error('Failed to login');
      }
}

export const logoutUser = async () => {
  try {
    const res = await axios.get<Auth>(`${API_URL}/logout`);

    return res.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
}