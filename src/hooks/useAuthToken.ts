import { useSelector } from 'react-redux';
import { RootState } from '../app/store'; // Adjust the import path as necessary

export const useAuthToken = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token;
};
