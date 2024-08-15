import axios from "axios";
import { API_URL } from "../config";
import {getHeaders} from "../helpers/getHeaders";
import {User, UserPaged} from "../types/user";
import { UserType } from "../types/userType";
import {UserForm} from "../types/userForm";
import {ClientPaged} from "../types/client";

export const userGetAll = async (headers: any): Promise<User[]> => {
    try {
        const res = await axios.get<User[]>(`${API_URL}/users`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting users.');
    }
}

export const userGetAllPaged = async (page: number, headers: any): Promise<UserPaged> => {
    try {
        const res = await axios.get(`${API_URL}/users/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting users.');
    }
}

export const userGetSingle = async (idUser: number, headers: any): Promise<User> => {
    try{
        const res = await axios(`${API_URL}/users/${idUser}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get user')
    }
}

export const registerUser = async (userData: User, headers: any): Promise<User> => {
    try {
        const res = await axios.post(`${API_URL}/users/register`, userData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to register user.');
    }
}

export const updateUser = async (idUser: number, userData: User, headers: any): Promise<User> => {
    try {
        const res = await axios.put(`${API_URL}/users/${idUser}`, userData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update user.');
    }
}

export const userDelete = async (idUser: number | undefined, headers: any): Promise<User> => {
    try{
        const res = await axios.delete(`${API_URL}/users/${idUser}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete user')
    }
}

export const getCreateForm = async (headers: any): Promise<UserForm> => {
    try {
        const res = await axios.get<UserForm>(`${API_URL}/users/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting user create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<UserForm> => {
    try {
        const res = await axios.get<UserForm>(`${API_URL}/users/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting user update form.');
    }
}

export const verifyUser = async (credentials: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/users/verify`, credentials);
        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response;
        } else {
            throw new Error('Failed to verify user: Network Error');
        }
    }
}

export const resetPassword = async (credentials: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/users/reset-password`, credentials);
        return res.data;
    } catch (error) {
        throw new Error('Failed to reset password.');
    }
}