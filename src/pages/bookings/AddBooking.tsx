import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Booking} from "../../types/booking";
import {BookingForm} from "../../types/bookingForm";
import {useHeaders} from "../../hooks/useHeaders";
import {bookingCreate, getCreateForm} from "../../api/bookingService";
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
import {DateTimePicker} from "@mui/x-date-pickers";
import theme from "../../theme/theme";
import {UserType} from "../../types/userType";
import {Client} from "../../types/client";

export const AddBooking = () => {
    const navigate = useNavigate();
    const [booking, setBooking] = useState<Booking>();
    const [bookingCreateForm, setBookingCreateForm] = useState<BookingForm>();
    const [errors, setErrors] = useState<any>({
        bookingDate: false,
        flightNumber: false,
        departureDateTime: false,
        arrivalDateTime: false,
        flightClass: false,
        weight: false,
        price: false,
        idClient: false,
    });
    const headers = useHeaders();

    useEffect( () => {
        const getBookingCreateForm = async () => {
            const bookingCreateFormResponse = await getCreateForm(headers);
            setBookingCreateForm(bookingCreateFormResponse);
            setBooking({
                ...booking,
            });
        }

        getBookingCreateForm();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const onDateChange = (val: any, property: string) => {
        setBooking({
            ...booking,
            [property]: val
        });
        setErrors({...errors, [property]: !(val) ? true : false });
    };

    const onTimeChange = (val: any, property: string) => {
        setBooking({
            ...booking,
            [property]: val
        });
        setErrors({...errors, [property]: !(val) ? true : false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!booking?.bookingDate || !booking?.flightNumber || !booking?.departureDateTime || !booking?.arrivalDateTime
            || !booking?.flightClass || !booking?.weight || !booking?.price || !booking?.idClient){

            setErrors({
                bookingDate: !booking?.bookingDate ? true : false,
                flightNumber: !booking?.flightNumber ? true : false,
                departureDateTime: !booking?.departureDateTime ? true : false,
                arrivalDateTime: !booking?.arrivalDateTime ? true : false,
                flightClass: !booking?.flightClass ? true : false,
                weight: !booking?.weight ? true : false,
                price: !booking?.price ? true : false,
                idClient: !booking?.idClient ? true : false,
            })

            return;
        }

        try{
            const res = await bookingCreate(booking, headers);

            if(res){
                navigate(`/bookings`);
            }
        }catch(error) {
            console.error('Booking create failed', error);
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
                            title="Shto Rezervimin"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={12}
                                    >
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DatePicker
                                                        label="Data e rezervimit"
                                                        value={booking?.bookingDate}
                                                        onChange={(val) => onDateChange(val, 'bookingDate')}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important',
                                                            border: errors.departureDateTime ? '1px solid red' : 'none',
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
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DateTimePicker
                                                        label="Data e Nisjes"
                                                        value={booking?.departureDateTime}
                                                        onChange={(val) => onTimeChange(val, 'departureDateTime')}
                                                        ampm={false}
                                                        format="DD/MM/YYYY HH:mm"
                                                        sx={{width: '100% !important',
                                                            border: errors.departureDateTime ? '1px solid red' : 'none',
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
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DateTimePicker
                                                        label="Data e Arritjes"
                                                        value={booking?.arrivalDateTime}
                                                        onChange={(val) => onTimeChange(val, 'arrivalDateTime')}
                                                        ampm={false}
                                                        format="DD/MM/YYYY HH:mm"
                                                        sx={{width: '100% !important',
                                                            border: errors.arrivalDateTime ? '1px solid red' : 'none',
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
                                            error={errors.flightNumber}
                                            label="Numri i fluturimit"
                                            name="flightNumber"
                                            type='text'
                                            onChange={handleChange}
                                            value={booking?.flightNumber}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.flightNumber ? true : false,
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
                                            error={errors.flightClass}
                                            label="Klasa e fluturimit"
                                            name="flightClass"
                                            onChange={handleChange}
                                            value={booking?.flightClass}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.flightClass ? true : false,
                                            }}
                                        >
                                            <MenuItem
                                                value={'economy'}
                                                selected
                                            >
                                                Economy
                                            </MenuItem >
                                            <MenuItem
                                                value={'business'}
                                            >
                                                Business
                                            </MenuItem >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.weight}
                                            label="Pesha"
                                            name="weight"
                                            type="text"
                                            onChange={handleChange}
                                            value={booking?.weight}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.weight ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.price}
                                            label="Çmimi"
                                            name="price"
                                            onChange={handleChange}
                                            value={booking?.price}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.price ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.idClient}
                                            label="Klienti"
                                            name="idClient"
                                            onChange={handleChange}
                                            select
                                            value={booking?.idClient}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.idClient ? true : false,
                                            }}
                                        >
                                            {bookingCreateForm?.clients.map((client: Client | any) => {
                                                return (
                                                    <MenuItem
                                                        key={client.idClient}
                                                        value={client.idClient}
                                                    >
                                                        {`${client.firstName} ${client.lastName}`}
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
                            <Link to={`/bookings`}>
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