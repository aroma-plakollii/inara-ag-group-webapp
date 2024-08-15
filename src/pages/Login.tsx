import {
    Alert,
    Box,
    Button,
    FormHelperText, IconButton,
    InputAdornment,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../api/authService';
import {clearError, login, setError} from '../features/auth/authSlice';
import {AuthLayout} from "./layout/AuthLayout";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        password:false,
        errorMessage: ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const token = useSelector((state: any) => state.auth.token); // Access token from Redux state

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(clearError());

      if(!email || !password){
          setErrors({
              ...errors,
              email: !email ? true : false,
              password: !password ? true : false,
          });
          return;
      }

      try {
        const res = await loginUser({ email, password });

          if(res.status === 400){
              setErrors({
                  ...errors,
                  errorMessage: "Email ose fjalëkalimi është gabim"
              });
              return;
          }

        if (res.user && res.token) {
          dispatch(login({
              user: res.user, 
              token: res.token,
          }));
          navigate('/home');
      } else {
            dispatch(setError());
            return;
          console.error('Invalid response format');
      }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return (
        <AuthLayout>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant="h5">PERDORUESI</Typography>
                        </Stack>
                            <form
                                noValidate
                                onSubmit={handleLogin}
                            >
                            <Stack spacing={3}>
                                <TextField
                                    error={errors.email}
                                    fullWidth
                                    helperText={errors.email}
                                    label="Email Adresa"
                                    name="email"
                                    // onBlur={formik.handleBlur}
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors({...errors, email: e.target.value ? false : true});
                                    }}
                                />
                                <TextField
                                    error={errors.password}
                                    fullWidth
                                    helperText={errors.password}
                                    label="Fjalëkalimi"
                                    name="password"
                                    // onBlur={formik.handleBlur}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors({...errors, password: e.target.value ? false : true});
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                            <Box sx={{display: 'flex', justifyContent: errors.errorMessage ? 'space-between' : 'flex-end'}}>
                                {errors.errorMessage && <Typography sx={{color: 'red', fontSize: '12px', pt: 2, fontWeight: '600'}}>{errors.errorMessage}</Typography>}
                                <Link to={'/forgot-password'} style={{textDecoration: 'none'}}>
                                    <Typography sx={{color: '#2970ff', fontSize: '12.5px', pt: 2, fontWeight: '600'}}>Keni harruar fjalëkalimin?</Typography>
                                </Link>
                            </Box>
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Kyqu
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default Login