import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../api/authService";
import {login} from "../features/auth/authSlice";
import {AuthLayout} from "./layout/AuthLayout";
import {Box, Button, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {verifyUser} from "../api/userService";
import {SkeletonInput} from "./shared/SkeletonInput";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        email: false,
        errorMessage: '',
        resMessage: ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if(!email){
            setErrors({
                ...errors,
                email: !email ? true : false,
            });
            setLoading(false);
            return;
        }

        try {
            const res = await verifyUser({ email });

            if(res.status === 404){
                setErrors({
                    ...errors,
                    errorMessage: "Përdoruesi nuk ekziston",
                    resMessage: ''
                });
                setLoading(false);
                return;
            }else if (res) {
                setErrors({
                    ...errors,
                    resMessage: "Është dërguar një email për të ndryshuar fjalëkalimin tuaj",
                    errorMessage: ''
                });
                setLoading(false);
                return;
            } else {
                setLoading(false);
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
                    {loading ? (
                        <SkeletonInput />
                    ) :(
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant="h5">Keni harruar fjalëkalimin?</Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={handleSubmit}
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
                            </Stack>
                            {errors.errorMessage && <Typography sx={{color: 'red', fontSize: '12.5px', pt: 2, fontWeight: '600'}}>{errors.errorMessage}</Typography>}
                            {errors.resMessage && <Typography sx={{color: '#2970ff', fontSize: '12.5px', pt: 2, fontWeight: '600'}}>{errors.resMessage}</Typography>}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Dërgo
                            </Button>
                        </form>
                    </div>)}
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default ForgotPassword;