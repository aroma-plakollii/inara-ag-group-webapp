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
import {Layout} from "../layout/Layout";
import {Link, useParams, useNavigate} from "react-router-dom";
import theme from "../../theme/theme";
import { ChangeEvent, useEffect, useState } from 'react';
import {getUpdateForm, updateUser, userGetSingle} from '../../api/userService';
import { UserForm } from '../../types/userForm';
import {UserType} from "../../types/userType";
import {User} from "../../types/user";
import { useHeaders } from '../../hooks/useHeaders';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {SkeletonDetails} from "../shared/SkeletonDetails";

export const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const profileUser = useSelector((state: RootState) => state.auth.user );
    const [user, setUser] = useState<User>();
    const [userUpdateForm, setUserUpdateForm] = useState<UserForm>();
    const [errors, setErrors] = useState<any>({
        firstName: false,
        lastName: false,
        email: false,
        confirmPassword: false,
        userRole: false,
        errorMessage: ''
    });
    const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [originalPassword, setOriginalPassword] = useState<string | undefined>('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders()

    useEffect(() => {
        const getUser = async () =>{
            const user = await userGetSingle(Number(userId), headers);
            const userUpdateFormResponse: UserForm = await getUpdateForm(headers);

            setUser(user);
            setUserUpdateForm(userUpdateFormResponse);
            setOriginalPassword(user?.password);
            setLoading(false);
        }   
        
        getUser();
    }, []);

    useEffect(() => {
        const changePassword = async () =>{
            showChangePassword ? setUser({...user, password: password}) : setUser({...user, password: originalPassword})
        }
        changePassword();
    }, [showChangePassword]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!user?.firstName || !user?.lastName || !user?.email || !user?.password || !user?.userRole || (showChangePassword && (!confirmPassword || password !== confirmPassword))){
            setErrors({
                firstName: !user?.firstName ? true : false,
                lastName: !user?.lastName ? true : false,
                email: !user?.email ? true : false,
                password: showPassword && (!user?.password || user?.password !== confirmPassword) ? true : false,
                confirmPassword: showPassword && (!confirmPassword || user?.password !== confirmPassword) ? true : false,
                userRole: !user?.userRole ? true : false,
                errorMessage: showPassword && (password !== confirmPassword) ? 'Fjalëkalimet nuk përputhen. Ju lutemi provoni përsëri.' : ''
            });
            setLoading(false);
            return;
        }

        try{
            const res = await updateUser(Number(userId), user, headers);

            if(res){
                setLoading(false);
                profileUser?.userRole === "SUPERADMIN" ? navigate('/users') : navigate('/home');
            }
        }catch(error) {
            console.error('User registration failed', error);
        }
    }

    if(loading){
        return (
            <SkeletonDetails />
        )
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
                            title="Detajet e Përdoruesit"
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
                                            select
                                            onChange={handleChange}
                                            value={user?.userRole || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: user?.userRole ? true : false,
                                            }}
                                        >
                                            <MenuItem
                                                key={1}
                                                value={userUpdateForm?.userRoles.SUPERADMIN}
                                            >
                                                {userUpdateForm?.userRoles.SUPERADMIN}
                                            </MenuItem >
                                            <MenuItem
                                                key={2}
                                                value={userUpdateForm?.userRoles.ADMIN}
                                            >
                                                {userUpdateForm?.userRoles.ADMIN}
                                            </MenuItem >
                                            <MenuItem
                                                key={3}
                                                value={userUpdateForm?.userRoles.AGENT}
                                            >
                                                {userUpdateForm?.userRoles.AGENT}
                                            </MenuItem >
                                        </TextField>
                                    </Grid>
                                    {showChangePassword &&
                                        <>
                                            <Grid
                                                xs={12}
                                                md={6}
                                            >
                                                <TextField
                                                    fullWidth
                                                    error={errors.password}
                                                    label="Fjalëkalimi i ri"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    onChange={(e) => {
                                                        const inputValue: string = e.target.value ? e.target.value : '';
                                                        setPassword(inputValue);
                                                        setUser({...user, password: inputValue})
                                                        setErrors({...errors, password: !inputValue ? true : false});
                                                    }}
                                                    value={password}
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: password ? true : false,
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
                                                        const inputValue: string = e.target.value ? e.target.value : '';
                                                        setConfirmPassword(inputValue);
                                                        setErrors({...errors, confirmPassword: !inputValue ? true : false});
                                                    }}
                                                    value={confirmPassword}
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
                                        </>
                                    }
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Typography onClick={() => setShowChangePassword(!showChangePassword)} sx={{fontSize: '14px', textDecoration: 'underline', cursor: 'pointer', mr: 1}}>
                                {showChangePassword ? 'Anulo ndryshimin e fjalëkalimit' : 'Ndrysho fjalëkalimin'}
                            </Typography>
                            <Link to={`${profileUser?.userRole === "SUPERADMIN" ? '/users' : '/home'}`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit" onClick={handleSubmit}>
                                Ruaj ndryshimet
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}