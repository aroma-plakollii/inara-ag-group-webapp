import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthLayout} from "./layout/AuthLayout";
import {Box, Button, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {resetPassword} from "../api/userService";

const ResetPassword = () => {
    const { idUser } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        password:false,
        confirmPassword: false,
        errorMessage: ''
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!password || !confirmPassword){
            setErrors({
                ...errors,
                password: !password ? true : false,
                confirmPassword: !confirmPassword ? true : false,
            });
            return;
        }else if(password !== confirmPassword){
            setErrors({
                ...errors,
                password: true,
                confirmPassword:  true,
                errorMessage: 'Fjalëkalimet nuk përputhen. Ju lutemi provoni përsëri.'
            });
            return;
        }

        try {
            const res = await resetPassword({ idUser, password });

            if (res) {
                navigate('/login');
            } else {
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
                            <Typography variant="h5">NDRYSHO FJALËKALIMIN</Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={handleLogin}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={errors.password}
                                    fullWidth
                                    helperText={errors.password}
                                    label="Fjalëkalimi"
                                    name="password"
                                    // onBlur={formik.handleBlur}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors({...errors, password: e.target.value ? false : true, errorMessage: ''});
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
                                <TextField
                                    error={errors.confirmPassword}
                                    fullWidth
                                    helperText={errors.confirmPassword}
                                    label="Konfirmo Fjalëkalimin"
                                    name="confirmPassword"
                                    // onBlur={formik.handleBlur}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrors({...errors, confirmPassword: e.target.value ? false : true, errorMessage: ''});
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
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
                            {errors.errorMessage && <Typography sx={{color: 'red', fontSize: '12.5px', pt: 2, fontWeight: '600'}}>{errors.errorMessage}</Typography>}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Ndrysho
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default ResetPassword;