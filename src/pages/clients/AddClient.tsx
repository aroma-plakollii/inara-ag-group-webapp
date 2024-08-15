import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    FormControl,
    Unstable_Grid2 as Grid,
    MenuItem,
    Typography
} from '@mui/material';
import {Layout} from "../layout/Layout";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {Link, useNavigate} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Client} from "../../types/client";
import {ClientForm} from "../../types/clientForm";
import {clientCreate, getCreateForm} from "../../api/clientService";
import { useHeaders } from '../../hooks/useHeaders';
import {User} from "../../types/user";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const AddClient = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const [client, setClient] = useState<Client>();
    const [clientCreateForm, setClientCreateForm] = useState<ClientForm>();
    const [errors, setErrors] = useState<any>({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        nationalId: false,
        passportId: false,
        country: false,
        dateOfBirth: false,
        errorMessageNationalId: '',
        errorMessagePassportId: ''
    });
    const headers = useHeaders();

    useEffect( () => {
        const getClientCreateForm = async () => {
            if (user !== null) {
                setClient({ ...client, idUser: user });
            }
            const clientCreateFormResponse = await getCreateForm(headers);

            setClientCreateForm(clientCreateFormResponse);
        }

        getClientCreateForm();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const onDateChange = (val: any) => {
        setClient({
            ...client,
            dateOfBirth: val
        });
        setErrors({...errors, dateOfBirth: !val ? true : false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!client?.firstName || !client?.lastName || !client?.phone
            || !client?.dateOfBirth || !client?.country){
            setErrors({
                ...errors,
                firstName: !client?.firstName ? true : false,
                lastName: !client?.lastName ? true : false,
                phone: !client?.phone ? true : false,
                dateOfBirth: !client?.dateOfBirth ? true : false,
                country: !client?.country ? true : false,
            });
            return;
        }

        try{
            const res = await clientCreate(client, headers);

            if(res.subject === 'nationalId'){
                setErrors({
                    ...errors,
                    nationalId: true,
                    errorMessageNationalId: "Ekziston një klient me të njëjtin numër të leternjoftimit"
                });
                return;
            }else if(res.subject === 'passportId'){
                setErrors({
                    ...errors,
                    passportId: true,
                    errorMessagePassportId: "Ekziston një klient me të njëjtin numër të pasaportës"
                });
                return;
            }

            if(res){
                navigate('/clients');
            }
        }catch(error) {
            console.error('Client create failed', error);
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
                            title="Shto Klientin"
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
                                            value={client?.firstName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.firstName ? true : false,
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
                                            value={client?.lastName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.lastName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={client?.email}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.email ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.phone}
                                            label="Numri i telefonit"
                                            name="phone"
                                            onChange={handleChange}
                                            value={client?.phone}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.phone ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DatePicker
                                                        label="Data e lindjes"
                                                        value={client?.dateOfBirth}
                                                        onChange={onDateChange}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important',
                                                            border: errors.dateOfBirth ? '1px solid red' : 'none',
                                                            borderRadius: '10px'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Numri i leternjoftimit"
                                            name="nationalId"
                                            onChange={handleChange}
                                            value={client?.nationalId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.nationalId ? true : false,
                                            }}
                                        />
                                        {errors.errorMessageNationalId && <Typography sx={{color: 'red', fontSize: '12px', pt: 1}}>{errors.errorMessageNationalId}</Typography>}
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Numri i pasaportës"
                                            name="passportId"
                                            onChange={handleChange}
                                            value={client?.passportId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.passportId ? true : false,
                                            }}
                                        />
                                        {errors.errorMessagePassportId && <Typography sx={{color: 'red', fontSize: '12px', pt: 1}}>{errors.errorMessagePassportId}</Typography>}
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.country}
                                            label="Shteti"
                                            name="country"
                                            onChange={handleChange}
                                            value={client?.country}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.country ? true : false,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/clients`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit">
                                Ruaj
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}