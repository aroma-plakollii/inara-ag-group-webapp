import axios from "axios";
import { API_URL } from "../config";
import {UserType} from "../types/userType";

export const userTypeGetAll = async (headers: any): Promise<UserType[]> => {
    try {
        const res = await axios.get(`${API_URL}/userTypes`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting userTypes.');
    }
}

export const userTypeGetSingle = async (idUserType: number, headers: any): Promise<UserType> => {
    try{
        const res = await axios(`${API_URL}/userTypes/${idUserType}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get userType')
    }
}

export const userTypeCreate = async (userTypeData: UserType, headers: any): Promise<UserType> => {
    try {
        const res = await axios.post(`${API_URL}/userTypes/create`, userTypeData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create userType.');
    }
}

export const userTypeDelete = async (idUserType: number | undefined, headers: any): Promise<UserType> => {
    try{
        const res = await axios.delete(`${API_URL}/userTypes/${idUserType}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete userType')
    }
}