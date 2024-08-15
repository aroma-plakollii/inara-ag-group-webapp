import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store'; 
import { Auth } from '../types/auth'; 
import { setAuthData } from '../features/auth/authSlice'; 

export const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


    if(isAuthenticated) return {isAuthenticated}
    const storedData = sessionStorage.getItem('auth');
    if (storedData) {
      try {
          const sessionAuthData: Auth = JSON.parse(storedData);
          dispatch(setAuthData(sessionAuthData)); 
      } catch (error) {
          console.error('Error parsing stored authentication data:', error);
      }
  }

  return {isAuthenticated}
};
