import { getTokenFromSessionStorage } from "./getToken";

const token = getTokenFromSessionStorage();
const headerData = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

export const getHeaders = () => {
    return headerData;
}