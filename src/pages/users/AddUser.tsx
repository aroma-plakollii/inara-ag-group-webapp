import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    MenuItem,
    InputAdornment, IconButton, Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {ChangeEvent, useEffect, useState} from "react";
import theme from "../../theme/theme";
import {Link, useNavigate} from "react-router-dom";
import {UserForm} from "../../types/userForm";
import {UserType} from "../../types/userType";
import {getCreateForm, registerUser} from "../../api/userService";
import {Layout} from "../layout/Layout";
import {User} from "../../types/user";
import { useHeaders } from '../../hooks/useHeaders';
export const AddUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();
    const [userCreateForm, setUserCreateForm] = useState<UserForm>();
    const [errors, setErrors] = useState<any>({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        userRole: false,
        errorMessage: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const headers = useHeaders()

    useEffect( () => {
        const getUserTypes = async () => {
            const userCreateFormResponse = await getCreateForm(headers);

            setUserCreateForm(userCreateFormResponse);
        }

        getUserTypes();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.firstName || !user?.lastName || !user?.email || !user?.password || !user?.userRole || !confirmPassword || user?.password !== confirmPassword){
            setErrors({
                firstName: !user?.firstName ? true : false,
                lastName: !user?.lastName ? true : false,
                email: !user?.email ? true : false,
                password: !user?.password || user?.password !== confirmPassword ? true : false,
                confirmPassword: !confirmPassword || user?.password !== confirmPassword ? true : false,
                userRole: !user?.userRole ? true : false,
                errorMessage: user?.password !== confirmPassword ? 'Fjalëkalimet nuk përputhen. Ju lutemi provoni përsëri.' : ''
            });
            return;
        }

        try{
            const res = await registerUser(user, headers);

            if(res){
                navigate('/users');
            }
        }catch(error) {
            console.error('User registration failed', error);
        }
    }

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    width: '70%',
                    margin: 'auto',
                    '@media screen and (max-width: 576px)': {width: '90%'}
                }}
            >
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Card sx={{pb: 2}}>
                        <CardHeader
                            title="Regjistro Përdoruesin"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.firstName}
                                            label="Emri"
                                            name="firstName"
                                            type='text'
                                            onChange={handleChange}
                                            value={user?.firstName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: user?.firstName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.lastName}
                                            label="Mbiemri"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={user?.lastName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: user?.lastName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.email}
                                            label="Email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={user?.email}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: user?.email ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.userRole}
                                            label="Lloji i përdoruesit"
                                            name="userRole"
                                            onChange={handleChange}
                                            select
                                            value={user?.userRole}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: user?.userRole ? true : false,
                                            }}
                                        >
                                            <MenuItem
                                                key={1}
                                                value={userCreateForm?.userRoles.SUPERADMIN}
                                            >
                                                {userCreateForm?.userRoles.SUPERADMIN}
                                            </MenuItem >
                                            <MenuItem
                                                key={2}
                                                value={userCreateForm?.userRoles.ADMIN}
                                            >
                                                {userCreateForm?.userRoles.ADMIN}
                                            </MenuItem >
                                            <MenuItem
                                                key={3}
                                                value={userCreateForm?.userRoles.AGENT}
                                            >
                                                {userCreateForm?.userRoles.AGENT}
                                            </MenuItem >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.password}
                                            label="Fjalëkalimi"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={handleChange}
                                            value={user?.password || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: user?.password ? true : false,
                                            }}
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
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.confirmPassword}
                                            label="Konfirmo fjalëkalimin"
                                            name="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setErrors({...errors, confirmPassword: !e.target.value ? true : false});
                                            }}
                                            value={confirmPassword || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: confirmPassword ? true : false,
                                            }}
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
                                        {errors.errorMessage && <Typography sx={{color: 'red', fontSize: '12.5px', pt: 2, fontWeight: '600'}}>{errors.errorMessage}</Typography>}
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/users`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                                <Button variant="contained" type="submit">
                                    Regjistro
                                </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}