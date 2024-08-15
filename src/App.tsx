import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import Router from './routes/Router';
import {useDispatch} from "react-redux";
import {login, setAuthData} from './features/auth/authSlice';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const storedData = sessionStorage.getItem('auth');
        if (storedData) {
            const auth = JSON.parse(storedData);
            if (auth && auth.isAuthenticated) {
                dispatch(login({
                    user: auth.user,
                    token: auth.token,
                }));
                dispatch(setAuthData(auth));
            }
        }
    }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
