import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {Layout} from "../layout/Layout";
import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader, Divider,
    FormControl,
    MenuItem,
    TextField,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import theme from "../../theme/theme";
import {Passenger} from "../../types/passenger";
import {PassengerForm} from "../../types/passengerForm";
import {getCreateForm, passengerCreate} from "../../api/passengerService";
import {Booking} from "../../types/booking";

export const AddPassenger = () => {
    const navigate = useNavigate();
    const [passenger, setPassenger] = useState<Passenger>();
    const [passengerCreateForm, setPassengerCreateForm] = useState<PassengerForm>();
    const [error, setError] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect( () => {
        const getPassengerCreateForm = async () => {
            const passengerCreateFormResponse = await getCreateForm(headers);

            setPassengerCreateForm(passengerCreateFormResponse);
        }

        getPassengerCreateForm();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassenger({ ...passenger, [e.target.name]: e.target.value });
    };

    const onDateChange = (val: any) => {
        setPassenger({
            ...passenger,
            dateOfBirth: val
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false)

        if (!passenger?.firstName || !passenger?.lastName || !passenger?.email || !passenger?.phone
            || !passenger?.dateOfBirth || !passenger?.nationalId || !passenger?.country || !passenger?.idBooking){
            setError(true);
            return;
        }

        try{
            const res = await passengerCreate(passenger, headers);

            if(res){
                navigate('/passengers');
            }
        }catch(error) {
            console.error('Passenger create failed', error);
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
                            title="Shto Pasagjerin"
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
                                            error={error}
                                            label="Emri"
                                            name="firstName"
                                            type='text'
                                            onChange={handleChange}
                                            value={passenger?.firstName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.firstName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Mbiemri"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={passenger?.lastName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.lastName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={passenger?.email}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.email ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Numri i telefonit"
                                            name="phone"
                                            onChange={handleChange}
                                            value={passenger?.phone}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.phone ? true : false,
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
                                                        value={dayjs(passenger?.dateOfBirth)}
                                                        onChange={onDateChange}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important'}}
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
                                            error={error}
                                            label="Nacionaliteti"
                                            name="nationalId"
                                            onChange={handleChange}
                                            value={passenger?.nationalId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.nationalId ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Shteti"
                                            name="country"
                                            onChange={handleChange}
                                            value={passenger?.country}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.country ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            select
                                            error={error}
                                            label="Rezervimi"
                                            name="idBooking"
                                            onChange={handleChange}
                                            value={passenger?.idBooking}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: passenger?.idBooking ? true : false,
                                            }}
                                        >
                                            {passengerCreateForm?.bookings.map((booking: Booking | any) => {
                                                return (
                                                    <MenuItem
                                                        key={booking.idBooking}
                                                        value={booking.idBooking}
                                                    >
                                                        {booking.bookingNumber}
                                                    </MenuItem >
                                                )
                                            })}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/passengers`}>
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